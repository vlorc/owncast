import { h, Component } from '/js/web_modules/preact.js';
import htm from '/js/web_modules/htm.js';
const html = htm.bind(h);

import { OwncastPlayer } from './components/player.js';
import SocialIconsList from './components/platform-logos-list.js';
import UsernameForm from './components/chat/username.js';
import VideoPoster from './components/video-poster.js';
import Chat from './components/chat/chat.js';
import Websocket, {
  CALLBACKS,
  SOCKET_MESSAGE_TYPES,
} from './utils/websocket.js';
import { registerChat } from './chat/register.js';

import ExternalActionModal, {
  ExternalActionButton,
} from './components/external-action-modal.js';

import {
  addNewlines,
  classNames,
  clearLocalStorage,
  debounce,
  getLocalStorage,
  getOrientation,
  hasTouchScreen,
  makeLastOnlineString,
  parseSecondsToDurationString,
  pluralize,
  setLocalStorage,
} from './utils/helpers.js';
import {
  CHAT_MAX_MESSAGE_LENGTH,
  EST_SOCKET_PAYLOAD_BUFFER,
  HEIGHT_SHORT_WIDE,
  KEY_ACCESS_TOKEN,
  KEY_CHAT_DISPLAYED,
  KEY_USERNAME,
  MESSAGE_OFFLINE,
  MESSAGE_ONLINE,
  ORIENTATION_PORTRAIT,
  OWNCAST_LOGO_LOCAL,
  TEMP_IMAGE,
  TIMER_DISABLE_CHAT_AFTER_OFFLINE,
  TIMER_STATUS_UPDATE,
  TIMER_STREAM_DURATION_COUNTER,
  URL_CONFIG,
  URL_OWNCAST,
  URL_STATUS,
  URL_VIEWER_PING,
  WIDTH_SINGLE_COL,
} from './utils/constants.js';
import { checkIsModerator } from './utils/chat.js';

export default class App extends Component {
  constructor(props, context) {
    super(props, context);

    const chatStorage = getLocalStorage(KEY_CHAT_DISPLAYED);
    this.hasTouchScreen = hasTouchScreen();
    this.windowBlurred = false;

    this.state = {
      websocket: null,
      canChat: false, // all of chat functionality (panel + username)
      displayChatPanel: chatStorage === null ? true : chatStorage === 'true', // just the chat panel
      chatInputEnabled: false, // chat input box state
      accessToken: null,
      username: getLocalStorage(KEY_USERNAME),
      isModerator: false,

      isRegistering: false,
      touchKeyboardActive: false,

      configData: {
        loading: true,
      },
      extraPageContent: '',

      playerActive: false, // player object is active
      streamOnline: null, // stream is active/online
      isPlaying: false, // player is actively playing video

      // status
      streamStatusMessage: MESSAGE_OFFLINE,
      viewerCount: '',
      lastDisconnectTime: null,

      // dom
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      orientation: getOrientation(this.hasTouchScreen),

      externalAction: null,
    };

    // timers
    this.playerRestartTimer = null;
    this.offlineTimer = null;
    this.statusTimer = null;
    this.disableChatInputTimer = null;
    this.streamDurationTimer = null;

    // misc dom events
    this.handleChatPanelToggle = this.handleChatPanelToggle.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleFormFocus = this.handleFormFocus.bind(this);
    this.handleFormBlur = this.handleFormBlur.bind(this);
    this.handleWindowBlur = this.handleWindowBlur.bind(this);
    this.handleWindowFocus = this.handleWindowFocus.bind(this);
    this.handleWindowResize = debounce(this.handleWindowResize.bind(this), 250);

    this.handleOfflineMode = this.handleOfflineMode.bind(this);
    this.handleOnlineMode = this.handleOnlineMode.bind(this);
    this.disableChatInput = this.disableChatInput.bind(this);
    this.setCurrentStreamDuration = this.setCurrentStreamDuration.bind(this);

    this.handleKeyPressed = this.handleKeyPressed.bind(this);
    this.displayExternalAction = this.displayExternalAction.bind(this);
    this.closeExternalActionModal = this.closeExternalActionModal.bind(this);

    // player events
    this.handlePlayerReady = this.handlePlayerReady.bind(this);
    this.handlePlayerPlaying = this.handlePlayerPlaying.bind(this);
    this.handlePlayerEnded = this.handlePlayerEnded.bind(this);
    this.handlePlayerError = this.handlePlayerError.bind(this);

    // fetch events
    this.getConfig = this.getConfig.bind(this);
    this.getStreamStatus = this.getStreamStatus.bind(this);

    // user events
    this.handleWebsocketMessage = this.handleWebsocketMessage.bind(this);

    // chat
    this.hasConfiguredChat = false;
    this.setupChatAuth = this.setupChatAuth.bind(this);
    this.disableChat = this.disableChat.bind(this);
  }

  componentDidMount() {
    this.getConfig();
    if (!this.hasTouchScreen) {
      window.addEventListener('resize', this.handleWindowResize);
    }
    window.addEventListener('blur', this.handleWindowBlur);
    window.addEventListener('focus', this.handleWindowFocus);
    if (this.hasTouchScreen) {
      window.addEventListener('orientationchange', this.handleWindowResize);
    }
    window.addEventListener('keypress', this.handleKeyPressed);
    this.player = new OwncastPlayer();
    this.player.setupPlayerCallbacks({
      onReady: this.handlePlayerReady,
      onPlaying: this.handlePlayerPlaying,
      onEnded: this.handlePlayerEnded,
      onError: this.handlePlayerError,
    });
    this.player.init();
  }

  componentWillUnmount() {
    // clear all the timers
    clearInterval(this.playerRestartTimer);
    clearInterval(this.offlineTimer);
    clearInterval(this.statusTimer);
    clearTimeout(this.disableChatInputTimer);
    clearInterval(this.streamDurationTimer);
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('blur', this.handleWindowBlur);
    window.removeEventListener('focus', this.handleWindowFocus);
    window.removeEventListener('keypress', this.handleKeyPressed);
    if (this.hasTouchScreen) {
      window.removeEventListener('orientationchange', this.handleWindowResize);
    }
  }

  // fetch /config data
  getConfig() {
    fetch(URL_CONFIG)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.ok}`);
        }
        return response.json();
      })
      .then((json) => {
        this.setConfigData(json);
      })
      .catch((error) => {
        this.handleNetworkingError(`Fetch config: ${error}`);
      });
  }

  // fetch stream status
  getStreamStatus() {
    fetch(URL_STATUS)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok ${response.ok}`);
        }
        return response.json();
      })
      .then((json) => {
        this.updateStreamStatus(json);
      })
      .catch((error) => {
        this.handleOfflineMode();
        this.handleNetworkingError(`Stream status: ${error}`);
      });

    // Ping the API to let them know we're an active viewer
    fetch(URL_VIEWER_PING).catch((error) => {
      this.handleOfflineMode();
      this.handleNetworkingError(`Viewer PING error: ${error}`);
    });
  }

  setConfigData(data = {}) {
    const { name, summary, chatDisabled } = data;
    window.document.title = name;

    // If this is the first time setting the config
    // then setup chat if it's enabled.
    const chatBlocked = getLocalStorage('owncast_chat_blocked');
    if (!chatBlocked && !this.hasConfiguredChat && !chatDisabled) {
      this.setupChatAuth();
    }

    this.hasConfiguredChat = true;

    this.setState({
      canChat: !chatBlocked,
      configData: {
        ...data,
        summary: summary && addNewlines(summary),
      },
    });
  }

  // handle UI things from stream status result
  updateStreamStatus(status = {}) {
    const { streamOnline: curStreamOnline } = this.state;

    if (!status) {
      return;
    }
    const {
      viewerCount,
      online,
      lastConnectTime,
      streamTitle,
      lastDisconnectTime,
    } = status;

    this.setState({
      viewerCount,
      lastConnectTime,
      streamOnline: online,
      streamTitle,
      lastDisconnectTime,
    });

    if (status.online !== curStreamOnline) {
      if (status.online) {
        // stream has just come online.
        this.handleOnlineMode();
      } else {
        // stream has just flipped offline or app just got loaded and stream is offline.
        this.handleOfflineMode(lastDisconnectTime);
      }
    }
  }

  // when videojs player is ready, start polling for stream
  handlePlayerReady() {
    this.getStreamStatus();
    this.statusTimer = setInterval(this.getStreamStatus, TIMER_STATUS_UPDATE);
  }

  handlePlayerPlaying() {
    this.setState({
      isPlaying: true,
    });
  }

  // likely called some time after stream status has gone offline.
  // basically hide video and show underlying "poster"
  handlePlayerEnded() {
    this.setState({
      playerActive: false,
      isPlaying: false,
    });
  }

  handlePlayerError() {
    // do something?
    this.handleOfflineMode();
    this.handlePlayerEnded();
  }

  // stop status timer and disable chat after some time.
  handleOfflineMode(lastDisconnectTime) {
    clearInterval(this.streamDurationTimer);

    if (lastDisconnectTime) {
      const remainingChatTime =
        TIMER_DISABLE_CHAT_AFTER_OFFLINE -
        (Date.now() - new Date(lastDisconnectTime));
      const countdown = remainingChatTime < 0 ? 0 : remainingChatTime;
      if (countdown > 0) {
        this.setState({
          chatInputEnabled: true,
        });
      }
      this.disableChatInputTimer = setTimeout(this.disableChatInput, countdown);
    }

    this.setState({
      streamOnline: false,
      streamStatusMessage: MESSAGE_OFFLINE,
    });

    if (this.player.vjsPlayer && this.player.vjsPlayer.paused()) {
      this.handlePlayerEnded();
    }

    if (this.windowBlurred) {
      document.title = ` 🔴 ${
        this.state.configData && this.state.configData.name
      }`;
    }
  }

  // play video!
  handleOnlineMode() {
    this.player.startPlayer();
    clearTimeout(this.disableChatInputTimer);
    this.disableChatInputTimer = null;

    this.streamDurationTimer = setInterval(
      this.setCurrentStreamDuration,
      TIMER_STREAM_DURATION_COUNTER
    );

    this.setState({
      playerActive: true,
      streamOnline: true,
      chatInputEnabled: true,
      streamTitle: '',
      streamStatusMessage: MESSAGE_ONLINE,
    });

    if (this.windowBlurred) {
      document.title = ` 🟢 ${
        this.state.configData && this.state.configData.name
      }`;
    }
  }

  setCurrentStreamDuration() {
    let streamDurationString = '';
    if (this.state.lastConnectTime) {
      const diff = (Date.now() - Date.parse(this.state.lastConnectTime)) / 1000;
      streamDurationString = parseSecondsToDurationString(diff);
    }
    this.setState({
      streamStatusMessage: `${MESSAGE_ONLINE} ${streamDurationString}`,
    });
  }

  handleUsernameChange(newName) {
    this.setState({
      username: newName,
    });

    this.sendUsernameChange(newName);
  }

  handleFormFocus() {
    if (this.hasTouchScreen) {
      this.setState({
        touchKeyboardActive: true,
      });
    }
  }

  handleFormBlur() {
    if (this.hasTouchScreen) {
      this.setState({
        touchKeyboardActive: false,
      });
    }
  }

  handleChatPanelToggle() {
    const { displayChatPanel: curDisplayed } = this.state;

    const displayChat = !curDisplayed;
    setLocalStorage(KEY_CHAT_DISPLAYED, displayChat);
    this.setState({
      displayChatPanel: displayChat,
    });
  }

  disableChatInput() {
    this.setState({
      chatInputEnabled: false,
    });
  }

  handleNetworkingError(error) {
    console.error(`>>> App Error: ${error}`);
  }

  handleWindowResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      orientation: getOrientation(this.hasTouchScreen),
    });
  }

  handleWindowBlur() {
    this.windowBlurred = true;
  }

  handleWindowFocus() {
    this.windowBlurred = false;
    window.document.title = this.state.configData && this.state.configData.name;
  }

  handleSpaceBarPressed(e) {
    e.preventDefault();
    if (this.state.isPlaying) {
      this.setState({
        isPlaying: false,
      });
      try {
        this.player.vjsPlayer.pause();
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.setState({
        isPlaying: true,
      });
      this.player.vjsPlayer.play();
    }
  }

  handleMuteKeyPressed() {
    const muted = this.player.vjsPlayer.muted();
    const volume = this.player.vjsPlayer.volume();

    try {
      if (volume === 0) {
        this.player.vjsPlayer.volume(0.5);
        this.player.vjsPlayer.muted(false);
      } else {
        this.player.vjsPlayer.muted(!muted);
      }
    } catch (err) {
      console.warn(err);
    }
  }

  handleFullScreenKeyPressed() {
    if (this.player.vjsPlayer.isFullscreen()) {
      this.player.vjsPlayer.exitFullscreen();
    } else {
      this.player.vjsPlayer.requestFullscreen();
    }
  }

  handleVolumeSet(factor) {
    this.player.vjsPlayer.volume(this.player.vjsPlayer.volume() + factor);
  }

  handleKeyPressed(e) {
    if (
      e.target !== document.getElementById('message-input') &&
      e.target !== document.getElementById('username-change-input') &&
      e.target !== document.getElementsByClassName('emoji-picker__search')[0] &&
      this.state.streamOnline
    ) {
      switch (e.code) {
        case 'MediaPlayPause':
        case 'KeyP':
        case 'Space':
          this.handleSpaceBarPressed(e);
          break;
        case 'KeyM':
          this.handleMuteKeyPressed(e);
          break;
        case 'KeyF':
          this.handleFullScreenKeyPressed(e);
          break;
        case 'KeyC':
          this.handleChatPanelToggle();
          break;
        case 'Digit9':
          this.handleVolumeSet(-0.1);
          break;
        case 'Digit0':
          this.handleVolumeSet(0.1);
      }
    }
  }

  displayExternalAction(action) {
    const { username } = this.state;
    if (!action) {
      return;
    }
    const { url: actionUrl, openExternally } = action || {};
    let url = new URL(actionUrl);
    // Append url and username to params so the link knows where we came from and who we are.
    url.searchParams.append('username', username);
    url.searchParams.append('instance', window.location);

    const fullUrl = url.toString();

    if (openExternally) {
      var win = window.open(fullUrl, '_blank');
      win.focus();
      return;
    }
    this.setState({
      externalAction: {
        ...action,
        url: fullUrl,
      },
    });
  }
  closeExternalActionModal() {
    this.setState({
      externalAction: null,
    });
  }

  handleWebsocketMessage(e) {
    if (e.type === SOCKET_MESSAGE_TYPES.ERROR_USER_DISABLED) {
      // User has been actively disabled on the backend. Turn off chat for them.
      this.handleBlockedChat();
    } else if (
      e.type === SOCKET_MESSAGE_TYPES.ERROR_NEEDS_REGISTRATION &&
      !this.isRegistering
    ) {
      // User needs an access token, so start the user auth flow.
      this.state.websocket.shutdown();
      this.setState({ websocket: null });
      this.setupChatAuth(true);
    } else if (e.type === SOCKET_MESSAGE_TYPES.ERROR_MAX_CONNECTIONS_EXCEEDED) {
      // Chat server cannot support any more chat clients. Turn off chat for them.
      this.disableChat();
    } else if (e.type === SOCKET_MESSAGE_TYPES.CONNECTED_USER_INFO) {
      // When connected the user will return an event letting us know what our
      // user details are so we can display them properly.
      const { user } = e;
      const { displayName } = user;

      this.setState({
        username: displayName,
        isModerator: checkIsModerator(e),
      });
    }
  }

  handleBlockedChat() {
    setLocalStorage('owncast_chat_blocked', true);
    this.disableChat();
  }

  disableChat() {
    this.state.websocket.shutdown();
    this.setState({ websocket: null, canChat: false });
  }

  async setupChatAuth(force) {
    var accessToken = getLocalStorage(KEY_ACCESS_TOKEN);
    var username = getLocalStorage(KEY_USERNAME);

    if (!accessToken || force) {
      try {
        this.isRegistering = true;
        const registration = await registerChat(this.state.username);
        accessToken = registration.accessToken;
        username = registration.displayName;

        setLocalStorage(KEY_ACCESS_TOKEN, accessToken);
        setLocalStorage(KEY_USERNAME, username);

        this.isRegistering = false;
      } catch (e) {
        console.error('registration error:', e);
      }
    }

    if (this.state.websocket) {
      this.state.websocket.shutdown();
      this.setState({
        websocket: null,
      });
    }

    // Without a valid access token he websocket connection will be rejected.
    const websocket = new Websocket(accessToken);
    websocket.addListener(
      CALLBACKS.RAW_WEBSOCKET_MESSAGE_RECEIVED,
      this.handleWebsocketMessage
    );

    this.setState({
      username,
      websocket,
      accessToken,
    });
  }

  sendUsernameChange(newName) {
    const nameChange = {
      type: SOCKET_MESSAGE_TYPES.NAME_CHANGE,
      newName,
    };
    this.state.websocket.send(nameChange);
  }

  render(props, state) {
    const {
      chatInputEnabled,
      configData,
      displayChatPanel,
      canChat,
      isModerator,

      isPlaying,
      orientation,
      playerActive,
      streamOnline,
      streamStatusMessage,
      streamTitle,
      touchKeyboardActive,
      username,
      viewerCount,
      websocket,
      windowHeight,
      windowWidth,
      externalAction,
      lastDisconnectTime,
    } = state;
    const {
      version: appVersion,
      logo = TEMP_IMAGE,
      socialHandles = [],
      summary,
      tags = [],
      name,
      extraPageContent,
      chatDisabled,
      externalActions,
      customStyles,
      maxSocketPayloadSize,
    } = configData;

    const bgUserLogo = { backgroundImage: `url(${logo})` };

    const tagList = tags !== null && tags.length > 0 && tags.join(' #');

    let viewerCountMessage = '';
    if (streamOnline && viewerCount > 0) {
      viewerCountMessage = html`${viewerCount}
      ${pluralize(' viewer', viewerCount)}`;
    } else if (lastDisconnectTime) {
      viewerCountMessage = makeLastOnlineString(lastDisconnectTime);
    }

    const mainClass = playerActive ? 'online' : '';
    const isPortrait =
      this.hasTouchScreen && orientation === ORIENTATION_PORTRAIT;
    const shortHeight = windowHeight <= HEIGHT_SHORT_WIDE && !isPortrait;
    const singleColMode = windowWidth <= WIDTH_SINGLE_COL && !shortHeight;

    const shouldDisplayChat = displayChatPanel && canChat && !chatDisabled;

    const extraAppClasses = classNames({
      'config-loading': configData.loading,
      chat: shouldDisplayChat,
      'chat-hidden': !displayChatPanel && canChat && !chatDisabled, // hide panel
      'chat-disabled': !canChat || chatDisabled,
      'single-col': singleColMode,
      'bg-gray-800': singleColMode && shouldDisplayChat,
      'short-wide': shortHeight && windowWidth > WIDTH_SINGLE_COL,
      'touch-screen': this.hasTouchScreen,
      'touch-keyboard-active': touchKeyboardActive,
    });

    const poster = isPlaying
      ? null
      : html` <${VideoPoster} offlineImage=${logo} active=${streamOnline} /> `;

    // modal buttons
    const externalActionButtons =
      externalActions &&
      externalActions.length > 0 &&
      html`<div
        id="external-actions-container"
        class="flex flex-row align-center"
      >
        ${externalActions.map(
          function (action) {
            return html`<${ExternalActionButton}
              onClick=${this.displayExternalAction}
              action=${action}
            />`;
          }.bind(this)
        )}
      </div>`;

    // modal component
    const externalActionModal =
      externalAction &&
      html`<${ExternalActionModal}
        action=${externalAction}
        onClose=${this.closeExternalActionModal}
      />`;

    const chat = this.state.websocket
      ? html`
          <${Chat}
            websocket=${websocket}
            username=${username}
            chatInputEnabled=${chatInputEnabled && !chatDisabled}
            instanceTitle=${name}
            accessToken=${this.state.accessToken}
            inputMaxBytes=${maxSocketPayloadSize - EST_SOCKET_PAYLOAD_BUFFER ||
            CHAT_MAX_MESSAGE_LENGTH}
          />
        `
      : null;

    return html`
      <div
        id="app-container"
        class="flex w-full flex-col justify-start relative ${extraAppClasses}"
      >
        <style>
          ${customStyles}
        </style>

        <div id="top-content" class="z-50">
          <header
            class="flex border-b border-gray-900 border-solid shadow-md fixed z-10 w-full top-0	left-0 flex flex-row justify-between flex-no-wrap"
          >
            <h1
              class="flex flex-row items-center justify-start p-2 uppercase text-gray-400 text-xl	font-thin tracking-wider overflow-hidden whitespace-no-wrap"
            >
              <span
                id="logo-container"
                class="inline-block	rounded-full bg-white w-8 min-w-8 min-h-8 h-8 mr-2 bg-no-repeat bg-center"
              >
                <img
                  class="logo visually-hidden"
                  src=${OWNCAST_LOGO_LOCAL}
                  alt="owncast logo"
                />
              </span>
              <span class="instance-title overflow-hidden truncate"
                >${streamOnline && streamTitle ? streamTitle : name}</span
              >
            </h1>
            <div
              id="user-options-container"
              class="flex flex-row justify-end items-center flex-no-wrap"
            >
              <${UsernameForm}
                username=${username}
                isModerator=${isModerator}
                onUsernameChange=${this.handleUsernameChange}
                onFocus=${this.handleFormFocus}
                onBlur=${this.handleFormBlur}
              />
              <button
                type="button"
                id="chat-toggle"
                onClick=${this.handleChatPanelToggle}
                class="flex cursor-pointer text-center justify-center items-center min-w-12 h-full bg-gray-800 hover:bg-gray-700"
                style=${{ display: chatDisabled ? 'none' : 'block' }}
              >
                💬
              </button>
            </div>
          </header>
        </div>

        <main class=${mainClass}>
          <div
            id="video-container"
            class="flex owncast-video-container bg-black w-full bg-center bg-no-repeat flex flex-col items-center justify-start"
          >
            <video
              class="video-js vjs-big-play-centered display-block w-full h-full"
              id="video"
              preload="auto"
              controls
              playsinline
            ></video>
            ${poster}
          </div>

          <section
            id="stream-info"
            aria-label="Stream status"
            class="flex text-center flex-row justify-between font-mono py-2 px-4 bg-gray-900 text-indigo-200 shadow-md border-b border-gray-100 border-solid"
          >
            <span class="text-xs">${streamStatusMessage}</span>
            <span id="stream-viewer-count" class="text-xs text-right"
              >${viewerCountMessage}</span
            >
          </section>
        </main>

        <section id="user-content" aria-label="User information" class="p-8">
          <div class="user-content flex flex-row p-8">
            <div
              class="user-image rounded-full bg-white p-4 mr-8 bg-no-repeat bg-center"
              style=${bgUserLogo}
            >
              <img class="logo visually-hidden" alt="" src=${logo} />
            </div>
            <div
              class="user-content-header border-b border-gray-500 border-solid"
            >
              <h2 class="font-semibold text-5xl">
                <span class="streamer-name text-indigo-600">${name}</span>
              </h2>
              ${externalActionButtons &&
              html`<div>${externalActionButtons}</div>`}
              <h3 class="font-semibold text-3xl">
                ${streamOnline && streamTitle}
              </h3>
              <${SocialIconsList} handles=${socialHandles} />
              <div
                id="stream-summary"
                class="stream-summary my-4"
                dangerouslySetInnerHTML=${{ __html: summary }}
              ></div>
              <div id="tag-list" class="tag-list text-gray-600 mb-3">
                ${tagList && `#${tagList}`}
              </div>
            </div>
          </div>
          <div
            id="extra-user-content"
            class="extra-user-content px-8"
            dangerouslySetInnerHTML=${{ __html: extraPageContent }}
          ></div>
        </section>

        <footer class="flex flex-row justify-start p-8 opacity-50 text-xs">
          <span class="mx-1 inline-block">
            <a href="${URL_OWNCAST}" rel="noopener noreferrer" target="_blank"
              >${appVersion}</a
            >
          </span>
        </footer>

        ${chat} ${externalActionModal}
      </div>
    `;
  }
}
