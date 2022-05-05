package apmodels

import (
	"net/url"

	"github.com/go-fed/activity/streams"
	"github.com/go-fed/activity/streams/vocab"
)

// MakeHashtag will create and return a mastodon toot hashtag object with the provided name.
func MakeHashtag(name string) vocab.TootHashtag {
	u, _ := url.Parse("https://directory.owncast.online/tags/" + name)

	hashtag := streams.NewTootHashtag()
	hashtagName := streams.NewActivityStreamsNameProperty()
	hashtagName.AppendXMLSchemaString("#" + name)
	hashtag.SetActivityStreamsName(hashtagName)

	hashtagHref := streams.NewActivityStreamsHrefProperty()
	hashtagHref.Set(u)
	hashtag.SetActivityStreamsHref(hashtagHref)

	return hashtag
}
