const { Router } = require("express")
const router = Router()
const Article = require("../models/Article")

router.get("/upload", async (req, res) => {
	res.render("upload-article")
})

router.get("/:id", async (req, res) => {
	const mode = req.query.mode
	console.log(mode)
	if (mode !== "edit" && mode !== "view") {
		return res.redirect("/404")
	}

	const id = req.params.id
	const article = await Article.findById(id)
	console.log(article._id)
	res.render(mode === "view" ? "article" : "edit-article", { article })
})
router.post("/upload", async (req, res) => {
	try {
		const { title, topic, category, description, imgUrl } = req.body
		if (!title || !topic || !category || !description) {
			return res.status(400).json({ message: "Please fill all the fields" })
		}
		const article = new Article({
			title,
			topic,
			category,
			description,
			imgUrl,
			date: new Date().toDateString(),
		})
		const newArticle = await article.save()
		res.status(201).json(newArticle)
	} catch (error) {
		console.log(error)
	}
})

router.put("/edit", async (req, res) => {
	const { id, title, topic, category, description, imgUrl } = req.body
	if (!id || !title || !topic || !category || !description) {
		return res.status(400).json({ message: "Please fill all the fields" })
	}
	const result = await Article.updateOne(
		{ _id: id },
		{ title, topic, category, description, imgUrl }
	)
	res.sendStatus(200)
})

router.delete("/delete/:id", async (req, res) => {
	const id = req.params.id
	await Article.deleteOne({ _id: id })
	res.send()
})

module.exports = router
