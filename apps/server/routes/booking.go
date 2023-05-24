package routes

import (
	"co-working-space/apps/server/types"
	"fmt"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func GetAllRoom() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		list := []types.Room{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("Room").Scan(&list)

		return ctx.Status(http.StatusOK).JSON(list)
	}
}

func HandlerAddBooking(studentId string, roomId string, startTime string, endTime string, purpose string) fiber.Handler {
	db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
	if err != nil {
		panic("failed to connect to database")
	}
	token := uuid.New().String()
	a := types.Booking{
		Id:        token,
		RoomId:    roomId,
		StudentID: studentId,
		StartTime: startTime,
		EndTime:   endTime,
		Purpose:   purpose,
	}
	db.Create(&a)

	return func(c *fiber.Ctx) error {
		fmt.Println(c.Body())
		return c.Status(http.StatusOK).JSON(a)
	}
}
