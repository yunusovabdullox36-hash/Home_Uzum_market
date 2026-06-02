const Router = require("express");

const router = new Router();

const commentController = require("../controllers/comment.controller");

router.get("/", commentController.getComments);
router.get("/:id", commentController.getCommentById);
router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

module.exports = router;