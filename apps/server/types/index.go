package types

import (
	"time"
)

type User struct {
	Id        string `json:"userId"`
	Firstname string `gorm:"column:firstName" json:"firstName"`
	Lastname  string `gorm:"column:lastName" json:"lastName"`
	StudentID string `gorm:"column:studentId" json:"studentId"`
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
	Id        int      `json:"id"`
	Name      string   `gorm:"column:name" json:"name"`
	OpenTime  string   `gorm:"column:openTime" json:"openTime"`
	CloseTime string   `gorm:"column:closeTime" json:"closeTime"`
	Booking   *Booking `gorm:"column:booking" json:"booking"`
}

type Booking struct {
	Id        string    `json:"id"`
	RoomId    int       `gorm:"column:roomId" json:"roomId"`
	StudentID string    `gorm:"column:studentId" json:"studentId"`
	StartTime string    `gorm:"column:start" json:"start"`
	EndTime   string    `gorm:"column:end" json:"end"`
	Title   string    `gorm:"column:title" json:"title"`
	Purpose   string    `gorm:"column:purpose" json:"purpose"`
	CreatedAt time.Time `gorm:"column:createdAt" json:"createdAt"`
}
