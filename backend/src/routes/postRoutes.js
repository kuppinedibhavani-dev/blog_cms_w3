const express = require("express");

const Post = require("../models/Post");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {

    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      author: req.user.id,
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

router.get("/", async (req, res) => {
  try {

    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {

    res.status(500).json(error);

  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check post owner

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {

    res.status(500).json(error);

  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Check ownership

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    post.title = title;
    post.content = content;

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });

  } catch (error) {

    res.status(500).json(error);

  }
});

module.exports = router;