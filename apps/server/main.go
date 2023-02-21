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
		Fname string `json:"fname"`
		Lname string `json:"lname"`
		Phone string `json:"phone"`
	}
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	dat, err := os.ReadFile("./src/cow.txt")
	check(err)
	fmt.Print(string(dat))
	fmt.Println("start at port", os.Getenv("PORT"))
	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("hello")
	})
	app.Post("/user", func(ctx *fiber.Ctx) error {
		// a := new(User)
		p := struct {
			Fname string
			Lname string
			Phone string
		}{}
		if err := ctx.BodyParser(&p); err != nil {
			return err
		}
		a := Hello{
			Fname: p.Fname,
			Lname: p.Lname,
			Phone: p.Phone,
		}
		return ctx.Status(http.StatusOK).JSON(a)
	})
	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
