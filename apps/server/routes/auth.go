package routes

import (
	"co-working-space/prisma/db"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"regexp"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/google/uuid"
	"github.com/shareed2k/goth_fiber"
)

func HealthCheckAuth() fiber.Handler{
  return func(ctx *fiber.Ctx) error {
    return ctx.SendString("Auth server is running!")
	}
}

func CompleteAuth() fiber.Handler {
  return func(ctx *fiber.Ctx) error {
		user, err := goth_fiber.CompleteUserAuth(ctx)
		if err != nil {
			log.Fatal(err)
		}

		email := user.Email
		firstName := user.FirstName
		lastName := user.LastName

		getEmail := regexp.MustCompile(`@`)
		studentId := getEmail.Split(email, 2)

		if err := HandleUserAuth(firstName, lastName, studentId[0]); err != nil {
        panic(err)
    }

    return ctx.SendString(email)
	}
}

func SignOut() fiber.Handler {
  return func(ctx *fiber.Ctx) error {
			if err := goth_fiber.Logout(ctx); err != nil {
				log.Fatal(err)
			}
			return ctx.SendString("User Has Signed Out")
		}
}

func CollectUserSession(token string) fiber.Handler {
	return func(c *fiber.Ctx) error {
	store := session.New()
		sess, err := store.Get(c)
		if err != nil {
				log.Fatal(err)
		}

		sess.Set("CorbToken", token)
		return c.SendString("Set Session")
	}
}

func HandleUserAuth(firstName string, lastName string, studentId string) error {
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
		token := uuid.New().String()

		createdUser, err := client.User.UpsertOne(
			db.User.StudentID.Equals(studentId),
		).Create(
				db.User.ID.Set(token),
        db.User.FirstName.Set(firstName),
        db.User.LastName.Set(lastName),
        db.User.StudentID.Set(studentId),
    ).Update(
        db.User.FirstName.Set(firstName),
        db.User.LastName.Set(lastName),
		).Exec(ctx)

		result, _ := json.MarshalIndent(createdUser, "", "  ")

		fmt.Printf("created user: %s\n", result)

    if err != nil {
        return err
    }

	return nil
}
