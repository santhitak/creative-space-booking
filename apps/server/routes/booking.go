package routes

import (
	"co-working-space/prisma/db"
	"context"
	"encoding/json"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

func GetAllRoom() fiber.Handler {
  return func(ctx *fiber.Ctx) error {
		client := db.NewClient()
    if err := client.Prisma.Connect(); err != nil {
        return err
    }

    defer func() {
        if err := client.Prisma.Disconnect(); err != nil {
            panic(err)
        }
    }()

		c := context.Background()

		rooms, err := client.Room.FindMany(
				db.Room.Name.Contains("Room"),
		).Exec(c)

		if err != nil {
        return err
    }

		log.Printf("rooms: %+v", rooms)
		return ctx.JSON(rooms)
	}
}

func HandlerAddBooking(studentId string) error {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	ctx := context.Background()

	// user, err := client.User.FindUnique(
  //   db.User.StudentID.Equals(studentId),
	// ).Exec(ctx)
	// if err != nil {
	// 	return err
	// }

	// room, err := client.Room.FindUnique(
  //   db.Room.ID.Equals(roomId),
	// ).Exec(ctx)
	// if err != nil {
	// 	return err
	// }

	// created, err := client.Booking.CreateOne(
  //       db.Booking.StudentID.Set(studentId),
  //       db.Booking.StartTime.Set(startTime),
  //       db.Booking.EndTime.Set(endTime),
  //       db.Booking.Purpose.Set(purpose),
  //       db.Booking.RoomID.Set(room.roomId),
  //   ).Exec(ctx)
  //   if err != nil {
  //       return err
  //   }

	booking, err := client.Booking.FindMany(
    db.Booking.StudentID.Equals(studentId	),
).Exec(ctx)

	result, _ := json.MarshalIndent(booking, "", "  ")

	fmt.Printf("find booking: %s\n", result)
	if err != nil {
		return err
	}

	return err
}
