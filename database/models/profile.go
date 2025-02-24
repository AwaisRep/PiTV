package models

import (
	"gorm.io/gorm"
)

type Profile struct {
	gorm.Model
	ID        uint   `gorm:"primaryKey" json:"id"`
	Name      string `gorm:"not null" json:"name"`
	LoginType uint   `gorm:"not null" json:"login_type"`
	URL       string `json:"url"`
	Host      string `json:"host"`
	Username  string `json:"username"`
	Password  string `json:"password"`
}
