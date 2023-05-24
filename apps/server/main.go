package main

import (
	"co-working-space/apps/server/routes"
	"co-working-space/apps/server/types"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/markbates/goth"
	"github.com/markbates/goth/providers/google"
	"github.com/shareed2k/goth_fiber"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	err := godotenv.Load()

	dat, err := os.ReadFile("./src/cow.txt")
	check(err)

	fmt.Print(string(dat))
	fmt.Printf("\nlistening at http://localhost:%s", os.Getenv("PORT"))

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://gofiber.io, https://gofiber.net, http://localhost:4200",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Server is running!")
	})

	goth.UseProviders(
		google.New(os.Getenv("OAUTH_KEY"), os.Getenv("OAUTH_SECRET"), "http://localhost:8000/auth/callback/google", "email", "profile"),
	)
	app.Get("/sign-in/:provider", goth_fiber.BeginAuthHandler)
	authRoute := app.Group("/auth")
	bookingRoute := app.Group("/booking")

	authRoute.Add("GET", "/", routes.HealthCheckAuth())
	authRoute.Add("GET", "/callback/:provider", routes.CompleteAuth())
	authRoute.Add("GET", "/sign-out", routes.SignOut())
	authRoute.Add("GET", "/test", routes.Test("63070025"))
	authRoute.Add("GET", "/u/:id", func(c *fiber.Ctx) error {
		list := types.User{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("users").Where("studentId = ?", c.Params("id")).Scan(&list)

		return c.Status(http.StatusOK).JSON(list)
	})

	app.Get("/session", func(c *fiber.Ctx) error {
		return c.SendString("Server is running!")
	})

	bookingRoute.Add("GET", "/room", routes.GetAllRoom())
	bookingRoute.Add("POST", "/create", func(c *fiber.Ctx) error {
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		token := uuid.New().String()
		p := struct {
			RoomId    int    `json:"roomId"`
			StudentID string `json:"studentId"`
			StartTime string `json:"startTime"`
			EndTime   string `json:"endTime"`
			Purpose   string `json:"purpose"`
		}{}
		if err := c.BodyParser(&p); err != nil {
			return err
		}
		a := types.Booking{
			Id:        token,
			RoomId:    p.RoomId,
			StudentID: p.StudentID,
			StartTime: p.StartTime,
			EndTime:   p.EndTime,
			Purpose:   p.Purpose,
		}
		db.Create(&a)
		return c.Status(http.StatusOK).JSON(a)

	})
	bookingRoute.Add("GET", "/:id/history", func(c *fiber.Ctx) error {
		list := []types.Booking{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("bookings").Where("studentId = ?", c.Params("id")).Scan(&list)

		return c.Status(http.StatusOK).JSON(list)
	})
	bookingRoute.Add("GET", "/all/:roomId", func(c *fiber.Ctx) error {
		list := []types.Booking{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("bookings").Where("roomId = ?", c.Params("roomId")).Scan(&list)

		return c.Status(http.StatusOK).JSON(list)
	})
	log.Fatal(app.Listen(":8000"))
}
