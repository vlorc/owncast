package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"strings"
	"time"

	"github.com/owncast/owncast/config"
	"github.com/owncast/owncast/models"
	log "github.com/sirupsen/logrus"
)

var emojiCache = make([]models.CustomEmoji, 0)
var emojiCacheTimestamp time.Time

// getCustomEmojiList returns a list of custom emoji either from the cache or from the emoji directory.
func getCustomEmojiList() []models.CustomEmoji {
	fullPath := filepath.Join(config.WebRoot, config.EmojiDir)
	emojiDirInfo, err := os.Stat(fullPath)
	if err != nil {
		log.Errorln(err)
	}
	if emojiDirInfo.ModTime() != emojiCacheTimestamp {
		log.Traceln("Emoji cache invalid")
		emojiCache = make([]models.CustomEmoji, 0)
	}

	if len(emojiCache) == 0 {
		files, err := os.ReadDir(fullPath)
		if err != nil {
			log.Errorln(err)
			return emojiCache
		}
		for _, f := range files {
			name := strings.TrimSuffix(f.Name(), path.Ext(f.Name()))
			emojiPath := filepath.Join(config.EmojiDir, f.Name())
			singleEmoji := models.CustomEmoji{Name: name, Emoji: emojiPath}
			emojiCache = append(emojiCache, singleEmoji)
		}

		emojiCacheTimestamp = emojiDirInfo.ModTime()
	}

	return emojiCache
}

// GetCustomEmoji returns a list of custom emoji via the API.
func GetCustomEmoji(w http.ResponseWriter, r *http.Request) {
	emojiList := getCustomEmojiList()

	if err := json.NewEncoder(w).Encode(emojiList); err != nil {
		InternalErrorHandler(w, err)
	}
}
