package client

import (
	"fmt"
	"pitv/database"
	"pitv/database/models"
	"sync"
	"time"

	xtreamcodes "github.com/tellytv/go.xtream-codes"
)

// XtreamData holds cached IPTV data for quick access.
type XtreamData struct {
	Profile          models.Profile
	LiveCategories   []xtreamcodes.Category
	VideoCategories  []xtreamcodes.Category
	SeriesCategories []xtreamcodes.Category
	LiveStreams      []xtreamcodes.Stream
	VODStreams       []xtreamcodes.Stream
	SeriesStreams    []xtreamcodes.SeriesInfo
	LastFetched      time.Time
}

// Client manages IPTV profiles, streams, and cached data.
type Client struct {
	caches map[uint]*XtreamData // Independent caches per profile ID
	mutex  sync.Mutex           // Protects concurrent access to caches
}

// NewClient creates a new instance of Client.
func NewClient() *Client {
	return &Client{
		caches: make(map[uint]*XtreamData),
	}
}

// ---------------------------
// Database CRUD Operations
// ---------------------------

// AddProfile adds a new IPTV profile to the database.
func (c *Client) AddProfile(profile models.Profile) error {
	return database.CreateProfile(&profile)
}

// GetProfiles retrieves all stored IPTV profiles from the database.
func (c *Client) GetProfiles() ([]models.Profile, error) {
	return database.GetProfiles()
}

// UpdateProfile updates an existing IPTV profile in the database.
func (c *Client) UpdateProfile(profile models.Profile) error {
	return database.UpdateProfile(&profile)
}

// DeleteProfile removes an IPTV profile from the database by ID.
func (c *Client) DeleteProfile(id uint) error {
	return database.DeleteProfiles(id)
}

// -----------------------------------
// IPTV Profile & Stream Management
// -----------------------------------

// LoadProfile initializes or retrieves cached data for the provided profile credentials.
// It fetches fresh data if no valid cache exists (older than 24 hours).
func (c *Client) LoadProfile(p models.Profile) (*XtreamData, error) {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	// Check if cache already exists and is fresh (less than 24 hours old)
	if data, exists := c.caches[p.ID]; exists && time.Since(data.LastFetched) < 24*time.Hour {
		return data, nil // Return existing valid cache
	}

	// Initialize Xtream client for this profile
	xtreamClient, err := xtreamcodes.NewClient(p.Username, p.Password, p.Host)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize Xtream client: %v", err)
	}

	// Fetch fresh data from Xtream API
	liveCat, errL := xtreamClient.GetLiveCategories()
	vodCat, errV := xtreamClient.GetVideoOnDemandCategories()
	seriesCat, errS := xtreamClient.GetSeriesCategories()
	liveStreams, errLS := xtreamClient.GetLiveStreams("")
	vodStreams, errVS := xtreamClient.GetVideoOnDemandStreams("")
	seriesStreams, errSS := xtreamClient.GetSeries("")

	if errL != nil || errV != nil || errS != nil || errLS != nil || errVS != nil || errSS != nil {
		return nil, fmt.Errorf(
			"fetch errors - liveCat:%v vodCat:%v seriesCat:%v liveStreams:%v vodStreams:%v seriesStreams:%v",
			errL, errV, errS, errLS, errVS, errSS,
		)
	}

	// Store fetched data in cache specific to this profile
	c.caches[p.ID] = &XtreamData{
		Profile:          p,
		LiveCategories:   liveCat,
		VideoCategories:  vodCat,
		SeriesCategories: seriesCat,
		LiveStreams:      liveStreams,
		VODStreams:       vodStreams,
		SeriesStreams:    seriesStreams,
		LastFetched:      time.Now(),
	}

	return c.caches[p.ID], nil
}

// UpdateCache manually forces refresh of cached data for a specific profile regardless of its age.
func (c *Client) UpdateCache(profileID uint) error {
	c.mutex.Lock()
	defer c.mutex.Unlock()

	cachedData, exists := c.caches[profileID]
	if !exists {
		return fmt.Errorf("no cached data found for profile ID %d", profileID)
	}

	p := cachedData.Profile

	client, err := xtreamcodes.NewClient(p.Username, p.Password, p.Host)
	if err != nil {
		return fmt.Errorf("failed to initialize Xtream client: %v", err)
	}

	liveCat, errL := client.GetLiveCategories()
	vodCat, errV := client.GetVideoOnDemandCategories()
	seriesCat, errS := client.GetSeriesCategories()
	liveStreams, errLS := client.GetLiveStreams("")
	vodStreams, errVS := client.GetVideoOnDemandStreams("")
	seriesStreams, errSS := client.GetSeries("")

	if errL != nil || errV != nil || errS != nil || errLS != nil || errVS != nil || errSS != nil {
		return fmt.Errorf(
			"fetch errors - liveCat:%v vodCat:%v seriesCat:%v liveStreams:%v vodStreams:%v seriesStreams:%v",
			errL, errV, errS, errLS, errVS, errSS,
		)
	}

	cachedData.LiveCategories = liveCat
	cachedData.VideoCategories = vodCat
	cachedData.SeriesCategories = seriesCat
	cachedData.LiveStreams = liveStreams
	cachedData.VODStreams = vodStreams
	cachedData.SeriesStreams = seriesStreams

	cachedData.LastFetched = time.Now()

	return nil
}

// WatchStream generates and returns a playable URL for the given stream type and ID.
// streamType must be one of: "live", "vod", or "series".
func (c *Client) WatchStream(profileID uint, streamType string, streamID int, episodeID ...int) (string, error) {
	c.mutex.Lock()
	data, exists := c.caches[profileID]
	c.mutex.Unlock()

	if !exists {
		return "", fmt.Errorf("no cached data found for profile ID %d", profileID)
	}

	p := data.Profile

	baseURL := p.Host
	username := p.Username
	password := p.Password

	switch streamType {
	case "live":
		return fmt.Sprintf("%s/live/%s/%s/%d.m3u8", baseURL, username, password, streamID), nil

	case "vod":
		return fmt.Sprintf("%s/movie/%s/%s/%d.mp4", baseURL, username, password, streamID), nil

	case "series":
		if len(episodeID) == 0 {
			return "", fmt.Errorf("episode ID required for series streams")
		}
		return fmt.Sprintf("%s/series/%s/%s/%d/%d.mp4", baseURL, username, password, streamID, episodeID[0]), nil

	default:
		return "", fmt.Errorf("invalid stream type")
	}
}
