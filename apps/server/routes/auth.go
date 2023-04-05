package routes

import (
	"log"

	"github.com/gofiber/fiber/v2"
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
		ctx.SendString(user.Email)

    return ctx.Redirect("http://localhost:4200")
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
