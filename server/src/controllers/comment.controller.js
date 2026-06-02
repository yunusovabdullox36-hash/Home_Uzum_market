const Comment = require("../models/comment.model");

class CommentController {
  async getComments(req, res) {
    try {
      const comments = await Comment.find()
        .populate("user")
        .populate("product");

      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({
          message: "Comment topilmadi",
        });
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createComment(req, res) {
    try {
      const comment = await Comment.create(req.body);

      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateComment(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!comment) {
        return res.status(404).json({
          message: "Comment topilmadi",
        });
      }

      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);

      if (!comment) {
        return res.status(404).json({
          message: "Comment topilmadi",
        });
      }

      res.status(200).json({
        message: "Comment o'chirildi",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CommentController();