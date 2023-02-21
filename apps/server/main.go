package main

import (
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
		FirstName string `json:"firstName"`
		LastName string `json:"lastName"`
		Phone string `json:"phone"`
	}

	err := godotenv.Load()
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
			FirstName string
			LastName string
			Phone string
		}{}

		if err := ctx.BodyParser(&p); err != nil {
			return err
		}

		a := Hello{
			FirstName: p.FirstName,
			LastName: p.LastName,
			Phone: p.Phone,
		}
		return ctx.Status(http.StatusOK).JSON(a)
	})

	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
