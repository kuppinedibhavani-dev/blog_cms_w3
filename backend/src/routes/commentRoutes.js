const express = require("express");

const Comment = require("../models/Comment");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Comment

router.post(
  "/:postId",
  authMiddleware,
  async (req, res) => {

    try {

      const comment = new Comment({
        content: req.body.content,
        post: req.params.postId,
        user: req.user.id,
      });

      await comment.save();

      const populatedComment =
        await Comment.findById(comment._id)
          .populate("user", "username");

      res.status(201).json(populatedComment);

    } catch (error) {

      res.status(500).json(error);

    }
  }
);

// Get Comments by Post

router.get("/:postId", async (req, res) => {

  try {

    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {

    res.status(500).json(error);

  }
});

module.exports = router;