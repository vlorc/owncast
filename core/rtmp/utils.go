package rtmp

import (
	"encoding/json"
	"errors"
	"fmt"
	"regexp"
	"strings"

	"github.com/nareix/joy5/format/flv/flvio"
	"github.com/owncast/owncast/models"
	log "github.com/sirupsen/logrus"
)

const unknownString = "Unknown"

var _getInboundDetailsFromMetadataRE = regexp.MustCompile(`\{(.*?)\}`)

func getInboundDetailsFromMetadata(metadata []interface{}) (models.RTMPStreamMetadata, error) {
	metadataComponentsString := fmt.Sprintf("%+v", metadata)
	if !strings.Contains(metadataComponentsString, "onMetaData") {
		return models.RTMPStreamMetadata{}, errors.New("Not a onMetaData message")
	}

	submatchall := _getInboundDetailsFromMetadataRE.FindAllString(metadataComponentsString, 1)

	if len(submatchall) == 0 {
		return models.RTMPStreamMetadata{}, errors.New("unable to parse inbound metadata")
	}

	metadataJSONString := submatchall[0]
	var details models.RTMPStreamMetadata
	err := json.Unmarshal([]byte(metadataJSONString), &details)
	return details, err
}

func getAudioCodec(codec interface{}) string {
	if codec == nil {
		return "No audio"
	}

	var codecID float64
	if assertedCodecID, ok := codec.(float64); ok {
		codecID = assertedCodecID
	} else {
		return codec.(string)
	}

	switch codecID {
	case flvio.SOUND_MP3:
		return "MP3"
	case flvio.SOUND_AAC:
		return "AAC"
	case flvio.SOUND_SPEEX:
		return "Speex"
	}

	return unknownString
}

func getVideoCodec(codec interface{}) string {
	if codec == nil {
		return unknownString
	}

	var codecID float64
	if assertedCodecID, ok := codec.(float64); ok {
		codecID = assertedCodecID
	} else {
		return codec.(string)
	}

	switch codecID {
	case flvio.VIDEO_H264:
		return "H.264"
	case flvio.VIDEO_H265:
		return "H.265"
	}

	return unknownString
}

func secretMatch(configStreamKey string, path string) bool {
	prefix := "/live/"

	if !strings.HasPrefix(path, prefix) {
		log.Debug("RTMP path does not start with " + prefix)
		return false // We need the path to begin with $prefix
	}

	streamingKey := path[len(prefix):] // Remove $prefix
	return streamingKey == configStreamKey
}
