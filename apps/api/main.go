package main

import (
	"context"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"os"
)

const keyServerAddr = "serverAddr"

func check(e error) {
  if e != nil {
      panic(e)
  }
}

func getRoot(w http.ResponseWriter, r *http.Request) {
  ctx := r.Context()

	fmt.Printf("%s: got a request\n", ctx.Value(keyServerAddr))
	io.WriteString(w, "Server is running!\n")
}

func main() {
    fmt.Println("Hello, World!")
    dat, err := os.ReadFile("./src/cow.txt")
    check(err)
    fmt.Print(string(dat))

    mux := http.NewServeMux()
    mux.HandleFunc("/", getRoot)

    ctx, cancelCtx := context.WithCancel(context.Background())
    serverOne := &http.Server{
      Addr:    ":3000",
      Handler: mux,
      BaseContext: func(l net.Listener) context.Context {
        ctx = context.WithValue(ctx, keyServerAddr, l.Addr().String())
        return ctx
      },
    }

    fmt.Println("Listening at port http://localhost:3000/")

    go func() {
		err := serverOne.ListenAndServe()
		if errors.Is(err, http.ErrServerClosed) {
			fmt.Printf("server closed\n")
		} else if err != nil {
			fmt.Printf("error listening for server one: %s\n", err)
		}
		cancelCtx()
	  }()

    <-ctx.Done()
}
