package playlist

import "os"

// WritePlaylist writes the playlist to disk.
func WritePlaylist(data string, filePath string) error {
	// nolint:gosec
	f, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer f.Close()

	if _, err := f.WriteString(data); err != nil {
		return err
	}

	return nil
}
