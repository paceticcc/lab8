package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type indexPage struct {
	Title         string
	FeaturedPosts []featuredPostData
	MostRecent    []mostRecentData
}

type postPageData struct {
	Title    string `db:"title"`
	ImgUrl   string `db:"image_url"`
	SubTitle string `db:"subtitle"`
	Content  string `db:"content"`
}

type featuredPostData struct {
	PostID      string `db:"post_ID"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgUrl      string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_img"`
	PublishDate string `db:"publish_date"`
}

type mostRecentData struct {
	PostID      string `db:"post_ID"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgUrl      string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_img"`
	PublishDate string `db:"publish_date"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		mostPosts, err := mostRecent(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := indexPage{
			Title:         "Escape",
			FeaturedPosts: featuredPosts,
			MostRecent:    mostPosts,
		}

		err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]
		log.Println(r)
		log.Println(postIDStr)
		postID, err := strconv.Atoi(postIDStr)

		if err != nil {
			http.Error(w, "Invalid order id", 403)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Order not found", 404)
				log.Println(err)
				return
			}

			http.Error(w, "Internal Server Error1", 500)
			log.Println(err)
			return
		}
		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error2", 500)
			log.Println(err.Error())
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func login(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/login.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := postPageData{
		Title:    "The Road Ahead",
		SubTitle: "The road ahead might be paved - it might not be.",
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func admin(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/admin.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}

	data := postPageData{
		Title:    "The Road Ahead",
		SubTitle: "The road ahead might be paved - it might not be.",
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func postByID(db *sqlx.DB, postID int) (postPageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			content
		FROM
			blog.post
		WHERE
			post_ID = ?
	`

	var order postPageData

	err := db.Get(&order, query, postID)
	if err != nil {
		return postPageData{}, err
	}

	return order, nil
}

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
		    post_ID
			title,
			subtitle,
			image_url,
			author,
			author_img,
			publish_date
		FROM
			blog.post
		WHERE featured = 1
	`

	var featurePosts []featuredPostData

	err := db.Select(&featurePosts, query)
	if err != nil {
		return nil, err
	}

	return featurePosts, nil
}

func mostRecent(db *sqlx.DB) ([]mostRecentData, error) {
	const query = `
		SELECT
			post_ID,
			title,
			subtitle,
			image_url,
			author,
			author_img,
			publish_date
		FROM
			blog.post
		WHERE featured = 0
	`
	var mostPosts []mostRecentData

	err := db.Select(&mostPosts, query)
	if err != nil {
		return nil, err
	}

	return mostPosts, nil
}
