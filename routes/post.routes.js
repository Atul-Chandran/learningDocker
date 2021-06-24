const express = require("express");

const PostController = require("../controllers/post.controller");

const router = express.Router();

const protect = require("../middleware/auth.middleware");

router.route("/")
.get(protect, PostController.getAllPosts)
.post(protect,PostController.createPost)

router.route("/:id")
.get(protect, PostController.getIndividualPost)
.patch(protect, PostController.updatePost)
.delete(protect, PostController.deletePost)

module.exports = router;