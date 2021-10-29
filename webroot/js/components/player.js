// https://docs.videojs.com/player

import videojs from '/js/web_modules/videojs/dist/video.min.js';
import { getLocalStorage, setLocalStorage } from '../utils/helpers.js';
import { PLAYER_VOLUME, URL_STREAM } from '../utils/constants.js';

const VIDEO_ID = 'video';

// Video setup
const VIDEO_SRC = {
  src: URL_STREAM,
  type: 'application/x-mpegURL',
};
const VIDEO_OPTIONS = {
  autoplay: false,
  liveui: true,
  preload: 'auto',
  controlBar: {
    progressControl: {
      seekBar: false,
    },
  },
  html5: {
    vhs: {
      // used to select the lowest bitrate playlist initially. This helps to decrease playback start time. This setting is false by default.
      enableLowInitialPlaylist: true,
      experimentalBufferBasedABR: true,
      maxPlaylistRetries: 10,
    },
  },
  liveTracker: {
    trackingThreshold: 0,
  },
  sources: [VIDEO_SRC],
};

export const POSTER_DEFAULT = `/img/logo.png`;
export const POSTER_THUMB = `/thumbnail.jpg`;

class OwncastPlayer {
  constructor() {
    window.VIDEOJS_NO_DYNAMIC_STYLE = true; // style override

    this.vjsPlayer = null;

    this.appPlayerReadyCallback = null;
    this.appPlayerPlayingCallback = null;
    this.appPlayerEndedCallback = null;

    // bind all the things because safari
    this.startPlayer = this.startPlayer.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
    this.handleError = this.handleError.bind(this);
    this.addQualitySelector = this.addQualitySelector.bind(this);

    this.qualitySelectionMenu = null;
  }

  init() {
    this.addAirplay();
    this.addQualitySelector();

    videojs.Vhs.xhr.beforeRequest = (options) => {
      if (options.uri.match('m3u8')) {
        const cachebuster = Math.round(new Date().getTime() / 1000);
        options.uri = `${options.uri}?cachebust=${cachebuster}`;
      }
      return options;
    };

    this.vjsPlayer = videojs(VIDEO_ID, VIDEO_OPTIONS);

    this.vjsPlayer.ready(this.handleReady);
  }

  setupPlayerCallbacks(callbacks) {
    const { onReady, onPlaying, onEnded, onError } = callbacks;

    this.appPlayerReadyCallback = onReady;
    this.appPlayerPlayingCallback = onPlaying;
    this.appPlayerEndedCallback = onEnded;
    this.appPlayerErrorCallback = onError;
  }

  // play
  startPlayer() {
    this.log('Start playing');
    const source = { ...VIDEO_SRC };

    try {
      this.vjsPlayer.volume(getLocalStorage(PLAYER_VOLUME) || 1);
    } catch (err) {
      console.warn(err);
    }
    this.vjsPlayer.src(source);
    // this.vjsPlayer.play();
  }

  handleReady() {
    this.log('on Ready');
    this.vjsPlayer.on('error', this.handleError);
    this.vjsPlayer.on('playing', this.handlePlaying);
    this.vjsPlayer.on('volumechange', this.handleVolume);
    this.vjsPlayer.on('ended', this.handleEnded);

    if (this.appPlayerReadyCallback) {
      // start polling
      this.appPlayerReadyCallback();
    }
  }

  handleVolume() {
    setLocalStorage(
      PLAYER_VOLUME,
      this.vjsPlayer.muted() ? 0 : this.vjsPlayer.volume()
    );
  }

  handlePlaying() {
    this.log('on Playing');
    if (this.appPlayerPlayingCallback) {
      // start polling
      this.appPlayerPlayingCallback();
    }
  }

  handleEnded() {
    this.log('on Ended');
    if (this.appPlayerEndedCallback) {
      this.appPlayerEndedCallback();
    }
  }

  handleError(e) {
    this.log(`on Error: ${JSON.stringify(e)}`);
    if (this.appPlayerEndedCallback) {
      this.appPlayerEndedCallback();
    }
  }

  log(message) {
    // console.log(`>>> Player: ${message}`);
  }

  async addQualitySelector() {
    if (this.qualityMenuButton) {
      player.controlBar.removeChild(this.qualityMenuButton);
    }

    videojs.hookOnce(
      'setup',
      async function (player) {
        var qualities = [];

        try {
          const response = await fetch('/api/video/variants');
          qualities = await response.json();
        } catch (e) {
          console.error(e);
        }

        var MenuItem = videojs.getComponent('MenuItem');
        var MenuButtonClass = videojs.getComponent('MenuButton');
        var MenuButton = videojs.extend(MenuButtonClass, {
          // The `init()` method will also work for constructor logic here, but it is
          // deprecated. If you provide an `init()` method, it will override the
          // `constructor()` method!
          constructor: function () {
            MenuButtonClass.call(this, player);
          },

          createItems: function () {
            const defaultAutoItem = new MenuItem(player, {
              selectable: true,
              label: 'Auto',
            });

            const items = qualities.map(function (item) {
              var newMenuItem = new MenuItem(player, {
                selectable: true,
                label: item.name,
              });

              // Quality selected
              newMenuItem.on('click', function () {
                // Only enable this single, selected representation.
                player
                  .tech({ IWillNotUseThisInPlugins: true })
                  .vhs.representations()
                  .forEach(function (rep, index) {
                    rep.enabled(index === item.index);
                  });
                newMenuItem.selected(false);
              });

              return newMenuItem;
            });

            defaultAutoItem.on('click', function () {
              // Re-enable all representations.
              player
                .tech({ IWillNotUseThisInPlugins: true })
                .vhs.representations()
                .forEach(function (rep, index) {
                  rep.enabled(true);
                });
              defaultAutoItem.selected(false);
            });

            return [defaultAutoItem, ...items];
          },
        });

        // Only show the quality selector if there is more than one option.
        if (qualities.length < 2) {
          return;
        }

        var menuButton = new MenuButton();
        menuButton.addClass('vjs-quality-selector');
        player.controlBar.addChild(
          menuButton,
          {},
          player.controlBar.children_.length - 2
        );
        this.qualityMenuButton = menuButton;
      }.bind(this)
    );
  }

  addAirplay() {
    videojs.hookOnce('setup', function (player) {
      if (window.WebKitPlaybackTargetAvailabilityEvent) {
        var videoJsButtonClass = videojs.getComponent('Button');
        var concreteButtonClass = videojs.extend(videoJsButtonClass, {
          // The `init()` method will also work for constructor logic here, but it is
          // deprecated. If you provide an `init()` method, it will override the
          // `constructor()` method!
          constructor: function () {
            videoJsButtonClass.call(this, player);
          },

          handleClick: function () {
            const videoElement = document.getElementsByTagName('video')[0];
            videoElement.webkitShowPlaybackTargetPicker();
          },
        });

        var concreteButtonInstance = player.controlBar.addChild(
          new concreteButtonClass()
        );
        concreteButtonInstance.addClass('vjs-airplay');
      }
    });
  }
}

export { OwncastPlayer };
