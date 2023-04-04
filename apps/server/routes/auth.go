package main

import (
  "github.com/gofiber/fiber/v2/middleware/cors"
  "github.com/gofiber/fiber/v2/middleware/logger"
  "github.com/joho/godotenv"
  "log"
  "os"

  "github.com/gofiber/fiber/v2"
  "github.com/markbates/goth"
  "github.com/markbates/goth/providers/google"

  "github.com/shareed2k/goth_fiber"
)

func main() {
  app := fiber.New()
  err := godotenv.Load("../../../.env")
  if err != nil {
    log.Fatal("Error loading .env file")
  }
  app.Use(logger.New())
  app.Use(cors.New(cors.Config{
    AllowOrigins: "https://gofiber.io, https://gofiber.net, http://localhost:4200",
    AllowHeaders: "Origin, Content-Type, Accept",
  }))
  // Optionally, you can override the session store here:
  // goth_fiber.SessionStore = session.New(session.Config{
  // 	KeyLookup:			"cookie:dinosaurus",
  // 	CookieHTTPOnly:	true,
  // 	Storage:				sqlite3.New(),
  // })

  goth.UseProviders(
    google.New(os.Getenv("OAUTH_KEY"), os.Getenv("OAUTH_SECRET"), "http://localhost:8000/auth/callback/google"),
  )

  app.Get("/login/:provider", goth_fiber.BeginAuthHandler)
  app.Get("/auth/callback/:provider", func(ctx *fiber.Ctx) error {
    user, err := goth_fiber.CompleteUserAuth(ctx)
    if err != nil {
      log.Fatal(err)
    }

    return ctx.Redirect("http://localhost:4200")
  })
  app.Get("/logout", func(ctx *fiber.Ctx) error {
    if err := goth_fiber.Logout(ctx); err != nil {
      log.Fatal(err)
    }

    return ctx.SendString("logout")
  })

  if err := app.Listen(":8000"); err != nil {
    log.Fatal(err)
  }
}

//package main
//
//import (
//	"fmt"
//	"io/ioutil"
//	"net/http"
//	"os"
//
//	"github.com/joho/godotenv"
//	"golang.org/x/oauth2"
//	"golang.org/x/oauth2/google"
//
//	_ "github.com/joho/godotenv/autoload"
//)
//
//var runenv = godotenv.Load("../../../.env")
//
//func check(e error) {
//	if e != nil {
//		panic(e)
//	}
//}
//
//func main() {
//
//	http.HandleFunc("/", handleHome)
//	http.HandleFunc("/login", handleLogin)
//	http.HandleFunc("/callback", handleCallback)
//	http.ListenAndServe(":"+os.Getenv("PORT"), nil)
//}
//
//var (
//	googleAuth = oauth2.Config{
//		RedirectURL:  "http://localhost:4200/",
//		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
//		ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
//		Scopes:       []string{"https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"},
//		Endpoint:     google.Endpoint,
//	}
//	randomState = "random"
//)
//
//func handleHome(w http.ResponseWriter, r *http.Request) {
//	var html = `<html><body><h1 style="color: red;">6*07****@it.kmitl.ac.th as an example</h1><a href="/login">Login with google</a></body></html>`
//	fmt.Fprint(w, html)
//}
//
//func handleLogin(w http.ResponseWriter, r *http.Request) {
//	url := googleAuth.AuthCodeURL(randomState)
//	http.Redirect(w, r, url, http.StatusTemporaryRedirect)
//	fmt.Println(os.Getenv("GOOGLE_CLIENT_ID"))
//}
//
//func handleCallback(w http.ResponseWriter, r *http.Request) {
//	if r.FormValue("state") != randomState {
//		fmt.Println("Valid state.")
//		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
//		return
//	}
//
//	token, err := googleAuth.Exchange(oauth2.NoContext, r.FormValue("code"))
//	if err != nil {
//		fmt.Println("Cant get token: %s", err.Error())
//		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
//		return
//	}
//
//	resp, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
//	if err != nil {
//		fmt.Println("Cant create request: %s", err.Error())
//		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
//		return
//	}
//
//	defer resp.Body.Close()
//	content, err := ioutil.ReadAll(resp.Body)
//	if err != nil {
//		fmt.Println("Cant parse response: %s", err.Error())
//		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
//		return
//	}
//
//	fmt.Fprintf(w, "Response: %s", content)
//}
