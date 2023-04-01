package types

type User struct {
	userId      string
	email       string
	firstName   string
	lastName    string
	isAvailable bool
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
	title   string
	booking Booking
}

type Booking struct {
	userId    string
	date      string
	startTime string
	endTime   string
}
