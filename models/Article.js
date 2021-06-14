const mongoose = require("mongoose")
const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	topic: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
		required: false,
	},
})
const Article = mongoose.model("Article", ArticleSchema)
module.exports = Article
/*
Title, date, category, topic, description of news
*/
