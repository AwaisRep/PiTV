package main

import (
	"embed"
	"log"
	"pitv/client"
	"pitv/database"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	db_error := database.Connect()
	if db_error != nil {
		log.Fatalf("Could not load the database: %v", db_error)
	}

	db_error = database.Migrations(database.DB)
	if db_error != nil {
		log.Fatalf("Could not run migrations: %v", db_error)
	}

	log.Printf("We succesfully loaded the database")
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:           "PiTV",
		Width:           1920,
		Height:          1080,
		MinWidth:        1280,
		MinHeight:       720,
		CSSDragProperty: "--wails-draggable",
		CSSDragValue:    "drag",
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			client.NewClient(),
			app,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
