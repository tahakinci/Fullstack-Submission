const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (req, res) => {
  const notes = await Blog.find({});

  res.json(notes);
});

blogRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes ? body.likes : 0,
    });

    const savedBlog = await blog.save();
    console.log("here: ", savedBlog);
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    next(error);
  }
});

module.exports = blogRouter;
