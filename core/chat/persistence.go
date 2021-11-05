package chat

import (
	"fmt"
	"strings"
	"time"

	"github.com/owncast/owncast/core/chat/events"
	"github.com/owncast/owncast/core/data"
	"github.com/owncast/owncast/core/user"
	"github.com/owncast/owncast/models"
	log "github.com/sirupsen/logrus"
)

var _datastore *data.Datastore

const (
	maxBacklogHours  = 5  // Keep backlog max hours worth of messages
	maxBacklogNumber = 50 // Return max number of messages in history request
)

func setupPersistence() {
	_datastore = data.GetDatastore()
	data.CreateMessagesTable(_datastore.DB)

	chatDataPruner := time.NewTicker(5 * time.Minute)
	go func() {
		runPruner()
		for range chatDataPruner.C {
			runPruner()
		}
	}()
}

// SaveUserMessage will save a single chat event to the messages database.
func SaveUserMessage(event events.UserMessageEvent) {
	saveEvent(event.ID, event.User.ID, event.Body, event.Type, event.HiddenAt, event.Timestamp)
}

func saveEvent(id string, userID string, body string, eventType string, hidden *time.Time, timestamp time.Time) {
	defer func() {
		_historyCache = nil
	}()

	_datastore.DbLock.Lock()
	defer _datastore.DbLock.Unlock()

	tx, err := _datastore.DB.Begin()
	if err != nil {
		log.Errorln("error saving", eventType, err)
		return
	}

	defer tx.Rollback() // nolint

	stmt, err := tx.Prepare("INSERT INTO messages(id, user_id, body, eventType, hidden_at, timestamp) values(?, ?, ?, ?, ?, ?)")
	if err != nil {
		log.Errorln("error saving", eventType, err)
		return
	}

	defer stmt.Close()

	if _, err = stmt.Exec(id, userID, body, eventType, hidden, timestamp); err != nil {
		log.Errorln("error saving", eventType, err)
		return
	}
	if err = tx.Commit(); err != nil {
		log.Errorln("error saving", eventType, err)
		return
	}
}

func getChat(query string) []events.UserMessageEvent {
	history := make([]events.UserMessageEvent, 0)
	rows, err := _datastore.DB.Query(query)
	if err != nil || rows.Err() != nil {
		log.Errorln("error fetching chat history", err)
		return history
	}
	defer rows.Close()

	for rows.Next() {
		var id string
		var userID string
		var body string
		var messageType models.EventType
		var hiddenAt *time.Time
		var timestamp time.Time

		var userDisplayName *string
		var userDisplayColor *int
		var userCreatedAt *time.Time
		var userDisabledAt *time.Time
		var previousUsernames *string
		var userNameChangedAt *time.Time

		// Convert a database row into a chat event
		err = rows.Scan(&id, &userID, &body, &messageType, &hiddenAt, &timestamp, &userDisplayName, &userDisplayColor, &userCreatedAt, &userDisabledAt, &previousUsernames, &userNameChangedAt)
		if err != nil {
			log.Errorln("There is a problem converting query to chat objects. Please report this:", query)
			break
		}

		// System messages and chat actions are special and are not from real users
		if messageType == events.SystemMessageSent || messageType == events.ChatActionSent {
			name := "Owncast"
			userDisplayName = &name
			color := 200
			userDisplayColor = &color
		}

		if previousUsernames == nil {
			previousUsernames = userDisplayName
		}

		if userCreatedAt == nil {
			now := time.Now()
			userCreatedAt = &now
		}

		user := user.User{
			ID:            userID,
			AccessToken:   "",
			DisplayName:   *userDisplayName,
			DisplayColor:  *userDisplayColor,
			CreatedAt:     *userCreatedAt,
			DisabledAt:    userDisabledAt,
			NameChangedAt: userNameChangedAt,
			PreviousNames: strings.Split(*previousUsernames, ","),
		}

		message := events.UserMessageEvent{
			Event: events.Event{
				Type:      messageType,
				ID:        id,
				Timestamp: timestamp,
			},
			UserEvent: events.UserEvent{
				User:     &user,
				HiddenAt: hiddenAt,
			},
			MessageEvent: events.MessageEvent{
				Body:    body,
				RawBody: body,
			},
		}

		history = append(history, message)
	}

	return history
}

var _historyCache *[]events.UserMessageEvent

// GetChatModerationHistory will return all the chat messages suitable for moderation purposes.
func GetChatModerationHistory() []events.UserMessageEvent {
	if _historyCache != nil {
		return *_historyCache
	}

	// Get all messages regardless of visibility
	query := "SELECT messages.id, user_id, body, eventType, hidden_at, timestamp, display_name, display_color, created_at, disabled_at, previous_names, namechanged_at FROM messages INNER JOIN users ON messages.user_id = users.id ORDER BY timestamp DESC"
	result := getChat(query)

	_historyCache = &result

	return result
}

// GetChatHistory will return all the chat messages suitable for returning as user-facing chat history.
func GetChatHistory() []events.UserMessageEvent {
	// Get all visible messages
	query := fmt.Sprintf("SELECT messages.id, user_id, body, eventType, hidden_at, timestamp, display_name, display_color, created_at, disabled_at, previous_names, namechanged_at FROM messages, users WHERE messages.user_id = users.id AND hidden_at IS NULL AND disabled_at IS NULL ORDER BY timestamp DESC LIMIT %d", maxBacklogNumber)
	m := getChat(query)

	// Invert order of messages
	for i, j := 0, len(m)-1; i < j; i, j = i+1, j-1 {
		m[i], m[j] = m[j], m[i]
	}

	return m
}

// SetMessageVisibilityForUserID will bulk change the visibility of messages for a user
// and then send out visibility changed events to chat clients.
func SetMessageVisibilityForUserID(userID string, visible bool) error {
	defer func() {
		_historyCache = nil
	}()

	// Get a list of IDs from this user within the 5hr window to send to the connected clients to hide
	ids := make([]string, 0)
	query := fmt.Sprintf("SELECT messages.id, user_id, body, eventType, hidden_at, timestamp, display_name, display_color, created_at, disabled_at,  previous_names, namechanged_at FROM messages INNER JOIN users ON messages.user_id = users.id WHERE user_id IS '%s'", userID)
	messages := getChat(query)

	if len(messages) == 0 {
		return nil
	}

	for _, message := range messages {
		ids = append(ids, message.ID)
	}

	// Tell the clients to hide/show these messages.
	return SetMessagesVisibility(ids, visible)
}

func saveMessageVisibility(messageIDs []string, visible bool) error {
	defer func() {
		_historyCache = nil
	}()

	_datastore.DbLock.Lock()
	defer _datastore.DbLock.Unlock()

	tx, err := _datastore.DB.Begin()
	if err != nil {
		return err
	}

	stmt, err := tx.Prepare("UPDATE messages SET hidden_at=? WHERE id IN (?" + strings.Repeat(",?", len(messageIDs)-1) + ")")
	if err != nil {
		return err
	}
	defer stmt.Close()

	var hiddenAt *time.Time
	if !visible {
		now := time.Now()
		hiddenAt = &now
	} else {
		hiddenAt = nil
	}

	args := make([]interface{}, len(messageIDs)+1)
	args[0] = hiddenAt
	for i, id := range messageIDs {
		args[i+1] = id
	}

	if _, err = stmt.Exec(args...); err != nil {
		return err
	}

	if err = tx.Commit(); err != nil {
		return err
	}

	return nil
}

// Only keep recent messages so we don't keep more chat data than needed
// for privacy and efficiency reasons.
func runPruner() {
	_datastore.DbLock.Lock()
	defer _datastore.DbLock.Unlock()

	log.Traceln("Removing chat messages older than", maxBacklogHours, "hours")

	deleteStatement := `DELETE FROM messages WHERE timestamp <= datetime('now', 'localtime', ?)`
	tx, err := _datastore.DB.Begin()
	if err != nil {
		log.Debugln(err)
		return
	}

	stmt, err := tx.Prepare(deleteStatement)
	if err != nil {
		log.Debugln(err)
		return
	}
	defer stmt.Close()

	if _, err = stmt.Exec(fmt.Sprintf("-%d hours", maxBacklogHours)); err != nil {
		log.Debugln(err)
		return
	}
	if err = tx.Commit(); err != nil {
		log.Debugln(err)
		return
	}
}
