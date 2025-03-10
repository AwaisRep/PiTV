package database

import (
	"fmt"
	"pitv/database/models"
)

func CreateProfile(profile *models.Profile) error {
	if DB == nil {
		return fmt.Errorf("database connection is not initialised")
	}
	return DB.Create(profile).Error
}

func GetProfiles() ([]models.Profile, error) {
	if DB == nil {
		return nil, fmt.Errorf("database connection is not initialised")
	}
	var profiles []models.Profile
	err := DB.Find(&profiles).Error
	return profiles, err
}

func UpdateProfile(profile *models.Profile) error {
	if DB == nil {
		return fmt.Errorf("database connection is not initialised")
	}
	return DB.Save(profile).Error
}

func DeleteProfiles(id uint) error {
	if DB == nil {
		return fmt.Errorf("database connection is not initialised")
	}
	return DB.Delete(&models.Profile{}, id).Error
}
