package main

import (
	"co-working-space/apps/server/types"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	type Hello struct {
		Email     string `json:"email"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
	}
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dat, err := os.ReadFile("./src/cow.txt")
	check(err)

	fmt.Print(string(dat))
	fmt.Printf("\nlistening at http://localhost:%s", os.Getenv("PORT"))
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Server is running!")
	})

	app.Post("/user", func(ctx *fiber.Ctx) error {
		p := struct {
			Email       string `json:"email"`
			FirstName   string `json:"firstName"`
			LastName    string `json:"lastName"`
			IsAvailable bool   `json:"isAvailable"`
		}{}

		if err := ctx.BodyParser(&p); err != nil {
			return err
		}
		a := types.User{
			Email:       p.Email,
			FirstName:   p.FirstName,
			LastName:    p.LastName,
			IsAvailable: p.IsAvailable,
		}
		return ctx.Status(http.StatusOK).JSON(a)
	})

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
