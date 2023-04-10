package main

import (
	"co-working-space/apps/server/routes"
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"github.com/markbates/goth"
	"github.com/markbates/goth/providers/google"
	"github.com/shareed2k/goth_fiber"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	err := godotenv.Load(".env")

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
	app.Get("/auth/callback/:provider", func(ctx *fiber.Ctx) error {
		//user, err := goth_fiber.CompleteUserAuth(ctx)
		//if err != nil {
		//	log.Fatal(err)
		//}
		return ctx.Redirect("http://localhost:4200/")
	})
	authRoute := app.Group("/auth")
	bookingRoute := app.Group("/booking")

	authRoute.Add("GET", "/", routes.HealthCheckAuth())
	authRoute.Add("GET", "/callback/:provider", routes.CompleteAuth())
	authRoute.Add("GET", "/sign-out", routes.SignOut())

	bookingRoute.Add("GET", "/room", routes.GetAllRoom())

	log.Fatal(app.Listen(":8000"))
}
