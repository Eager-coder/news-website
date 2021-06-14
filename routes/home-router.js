const { Router } = require("express")
const NewsAPI = require("newsapi")
const newsapi = new NewsAPI("9f7495f938b94d789d62351da0a01374")
const router = Router()
const Article = require("../models/Article")

router.get("/", async (req, res) => {
	const { articles: worldNews } = await newsapi.v2.topHeadlines({
		page: 1,
		sources: "bbc-news,the-verge",
	})
	console.log(req.query.category)
	const category = req.query.category
	let articles
	if (!category) {
		articles = await Article.find()
	} else {
		articles = await Article.find({ category })
	}
	res.render("homepage", { worldNews, articles })
})

module.exports = router
