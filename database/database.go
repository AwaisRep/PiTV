package database

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() error {
	var err error
	DB, err = gorm.Open(sqlite.Open("pitv.db"), &gorm.Config{})
	if err != nil {
		return err
	}
	return nil
}
