const commentsRouter = require("express").Router();
const Comment = require("../models/comments");
const Blog = require("../models/blog");

commentsRouter.get("/:id/comments", async (req, res) => {
  const comments = await Comment.find({ blogs: req.params.id });
  res.json(comments);
});

commentsRouter.post("/:id/comments", async (req, res) => {
  const body = req.body;

  const blog = await Blog.findById(req.params.id);

  const comment = new Comment({
    content: body.content,
    blogs: blog._id,
  });

  if (body.content === undefined) {
    res.status(400).end();
  } else {
    const savedComment = await comment.save();

    res.status(201).json(savedComment);
  }
});

module.exports = commentsRouter;
