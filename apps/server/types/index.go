package types

import (
	"time"
)

type User struct {
	Id        string
	Firstname string `gorm:"column:firstName"`
	Lastname  string `gorm:"column:lastName"`
	StudentID string `gorm:"column:studentId"`
}

type OAuthUser struct {
	sub            string
	name           string
	given_name     string
	family_name    string
	picture        string
	email          string
	email_verified string
	locale         string
}

type Room struct {
	Id        string
	Name      string   `gorm:"column:name"`
	OpenTime  string   `gorm:"column:openTime"`
	CloseTime string   `gorm:"column:closeTime"`
	Booking   *Booking `gorm:"column:booking"`
}

type Booking struct {
	Id        string
	RoomId    string    `gorm:"column:roomId"`
	StudentID string    `gorm:"column:studentId"`
	StartTime string    `gorm:"column:startTime"`
	EndTime   string    `gorm:"column:endTime"`
	Purpose   string    `gorm:"column:purpose"`
	CreatedAt time.Time `gorm:"column:createdAt"`
}
