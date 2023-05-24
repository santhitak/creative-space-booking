package routes

import (
	"co-working-space/apps/server/types"
	"co-working-space/prisma/db"
	"context"
	"errors"
	"net/http"
	"os"
	"reflect"
	_ "reflect"
	"regexp"

	"github.com/charmbracelet/log"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/google/uuid"
	"github.com/shareed2k/goth_fiber"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func HealthCheckAuth() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		return ctx.SendString("Auth server is running!")
	}
}

func Test(studentId string) fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		list := []types.Booking{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("Booking").Scan(&list)

		return ctx.Status(http.StatusOK).JSON(list)
	}
}

func CompleteAuth() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		user, err := goth_fiber.CompleteUserAuth(ctx)
		if err != nil {
			log.Fatal("hello")
		}

		email := user.Email
		firstName := user.FirstName
		lastName := user.LastName
		getEmail := regexp.MustCompile(`@`)
		studentId := getEmail.Split(email, 2)

		list := []types.User{}
		db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_USERNAME")+":"+os.Getenv("DATABASE_PASSWORD")+"@tcp"+"("+os.Getenv("DATABASE_HOST")+")"+"/"+os.Getenv("DATABSE_NAME")+"?tls=true"), &gorm.Config{TranslateError: true})
		if err != nil {
			panic("failed to connect to database")
		}
		db.Table("User").Where("studentId = ?", studentId[0]).Scan(&list)
		if reflect.ValueOf(list).Len() == 0 {
			token := uuid.New().String()
			a := types.User{
				Id:        token,
				Firstname: firstName,
				Lastname:  lastName,
				StudentID: studentId[0],
			}
			db.Create(&a)
			return nil
		}

		cookie := fiber.Cookie{
			Name:     "corb_token",
			Value:    studentId[0],
			HTTPOnly: false,
			SameSite: "lax",
		}

		ctx.Cookie(&cookie)

		return ctx.Redirect(`http://localhost:4200/`)
	}
}

func SignOut() fiber.Handler {
	store := session.New()
	return func(ctx *fiber.Ctx) error {
		sess, err := store.Get(ctx)
		if err != nil {
			panic(err)
		}
		sess.Delete("CorbToken")

		if err := goth_fiber.Logout(ctx); err != nil {
			log.Fatal(err)
		}
		return ctx.SendString("User Has Signed Out")
	}
}

var userid = ""

func HandlerGetUser(studentId string) (error, *db.UserModel) {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return err, nil
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	ctx := context.Background()
	getUser, err := client.User.FindUnique(
		db.User.StudentID.Equals(studentId),
	).Exec(ctx)

	if errors.Is(err, db.ErrNotFound) {
		log.Printf("no record with student id %s", studentId)
	} else if err != nil {
		log.Printf("error occurred: %s", err)
	}

	userid = getUser.ID
	return nil, getUser
}
