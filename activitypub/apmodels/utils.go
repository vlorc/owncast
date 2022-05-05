package apmodels

import (
	"encoding/json"
	"net/url"
	"path"

	"github.com/go-fed/activity/streams"
	"github.com/go-fed/activity/streams/vocab"
	"github.com/owncast/owncast/core/data"
	log "github.com/sirupsen/logrus"
)

// MakeRemoteIRIForResource will create an IRI for a remote location.
func MakeRemoteIRIForResource(resourcePath string, host string) (*url.URL, error) {
	generatedURL := "https://" + host
	u, err := url.Parse(generatedURL)
	if err != nil {
		return nil, err
	}

	u.Path = path.Join(u.Path, "federation", resourcePath)

	return u, nil
}

// MakeLocalIRIForResource will create an IRI for the local server.
func MakeLocalIRIForResource(resourcePath string) *url.URL {
	host := data.GetServerURL()
	u, err := url.Parse(host)
	if err != nil {
		log.Errorln("unable to parse local IRI url", host, err)
		return nil
	}

	u.Path = path.Join(u.Path, "federation", resourcePath)

	return u
}

// MakeLocalIRIForAccount will return a full IRI for the local server account username.
func MakeLocalIRIForAccount(account string) *url.URL {
	host := data.GetServerURL()
	u, err := url.Parse(host)
	if err != nil {
		log.Errorln("unable to parse local IRI account server url", err)
		return nil
	}

	u.Path = path.Join(u.Path, "federation", "user", account)

	return u
}

// Serialize will serialize an ActivityPub object to a byte slice.
func Serialize(obj vocab.Type) ([]byte, error) {
	var jsonmap map[string]interface{}
	jsonmap, _ = streams.Serialize(obj)
	b, err := json.Marshal(jsonmap)

	return b, err
}
