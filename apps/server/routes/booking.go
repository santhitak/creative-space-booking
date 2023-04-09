package routes

import (
	"co-working-space/prisma/db"
	"context"
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
