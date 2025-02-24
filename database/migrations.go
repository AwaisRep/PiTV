package database

import (
	"pitv/database/models"

	"gorm.io/gorm"
)

func Migrations(db *gorm.DB) error {
	err := db.AutoMigrate(&models.Profile{})
	if err != nil {
		return err
	}
	return nil
}
