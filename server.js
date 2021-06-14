const express = require("express")
const mongoose = require("mongoose")
const NewsAPI = require("newsapi")
const app = express()
require("dotenv").config()
app.set("view engine", "ejs")

const DB_URI = process.env.DB_URI

const PORT = process.env.PORT || 80
app.use(express.json())
app.use("/news", require("./routes/home-router"))
app.use("/article", require("./routes/article-router"))

app.use("/news", express.static("public"))
app.use("/article", express.static("public"))

app.use(express.static("public"))
app.get("/", (req, res) => {
	res.redirect("/news")
})
app.get("*", (req, res) => res.send("<h1>Oops! Not found.</h1>"))
const main = async () => {
	try {
		await mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
		app.listen(PORT, () => console.log("Server started on port " + PORT))
	} catch (error) {
		console.error(error)
	}
}

main()
