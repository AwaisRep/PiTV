package database

import (
	"pitv/database/models"
	"testing"

	"github.com/glebarez/sqlite"
	"github.com/stretchr/testify/assert"
	"gorm.io/gorm"
)

func SetupTestDB() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Attempt to migrate the database automatically
	db.AutoMigrate(&models.Profile{})
	return db, nil
}

func createXtreamProfile() models.Profile {
	return models.Profile{
		Name:      "Xtream Profile",
		LoginType: 2,
		Host:      "https://example.com:5050/",
		Username:  "test123",
		Password:  "test123",
	}
}

func createM3U8Profile() models.Profile {
	return models.Profile{
		Name:      "M3U8 Profile",
		LoginType: 1,
		URL:       "https://example.com/file.m3u8",
	}
}

func Test_CreateM3U8Profile(t *testing.T) {
	// Connect to the in-memory database
	db, err := SetupTestDB()
	if err != nil {
		t.Fatalf("Failed to connect to the database: %v", err)
	}

	// Generate and save the M3U8 profile
	m3u8Profile := createM3U8Profile()

	result := db.Create(&m3u8Profile)
	assert.NoError(t, result.Error)

	// Retrieve and validate the M3U8 profile
	var createdM3U8Profile models.Profile
	err = db.First(&createdM3U8Profile, m3u8Profile.ID).Error
	assert.NoError(t, err, "Failed to retrieve M3U8 profile")

	// Ensure data stored is matching the entry
	assert.Equal(t, "M3U8 Profile", createdM3U8Profile.Name)
	assert.Equal(t, uint(1), createdM3U8Profile.LoginType)
	assert.NotEmpty(t, createdM3U8Profile.URL, "URL should not be empty")
	assert.Regexp(t, `^https?:\/\/[\w\-\.]+(:\d+)?\/[\w\-\/]+\.m3u8$`, createdM3U8Profile.URL, "Invalid m3u8 file format")
}

func Test_CreateXtreamProfile(t *testing.T) {
	// Connect to the in-memory database
	db, err := SetupTestDB()
	if err != nil {
		t.Fatalf("Failed to connect to the database: %v", err)
	}

	// Generate and save the Xtream profile
	xtreamProfile := createXtreamProfile()
	result := db.Create(&xtreamProfile)
	assert.NoError(t, result.Error)

	// Retrieve and validate the Xtream profile
	var createdXtreamProfile models.Profile
	err = db.First(&createdXtreamProfile, xtreamProfile.ID).Error
	assert.NoError(t, err, "Failed to retrieve Xtream profile")

	// Ensure data stored is matching the entry
	assert.Equal(t, "Xtream Profile", createdXtreamProfile.Name)
	assert.Equal(t, uint(2), createdXtreamProfile.LoginType)
	assert.NotEmpty(t, createdXtreamProfile.Host, "Host should not be empty")
	assert.NotEmpty(t, createdXtreamProfile.Username, "Username should not be empty")
	assert.NotEmpty(t, createdXtreamProfile.Password, "Password should not be empty")
}
