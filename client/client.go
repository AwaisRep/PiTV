package client

import (
	"pitv/database"
	"pitv/database/models"

	xtreamcodes "github.com/tellytv/go.xtream-codes"
)

type Client struct{}

func NewClient() *Client {
	return &Client{}
}

// Simple CRUD Functions for React's interface
func (c *Client) AddProfile(profile models.Profile) error {
	return database.CreateProfile(&profile)
}

func (c *Client) GetProfile() ([]models.Profile, error) {
	return database.GetProfiles()
}

func (c *Client) UpdateProfile(profile models.Profile) error {
	return database.UpdateProfile(&profile)
}

func (c *Client) DeleteProfile(id uint) error {
	return database.DeleteProfiles(id)
}

// Profile/Stream handling
func (c *Client) GetProfileStream(p models.Profile) (*xtreamcodes.XtreamClient, error) {

	// Handle relevant stream with package
	// IMPLEMENT SOME STEP TO LOAD CACHE IF WITHIN LAST 24 HOUR PERIOD

	client, err := xtreamcodes.NewClient(p.Username, p.Password, p.Host)

	if err != nil {
		return nil, err
	}

	return client, nil

}

// Next steps:
// Figure out the way to handle a profile for fetching playlist
// Possibly new file for video stream?
