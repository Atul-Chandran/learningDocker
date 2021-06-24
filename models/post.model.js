const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post title required"]
    },
    body: {
        type: String,
        required: [true, "Post body required"]
    }
});

const Post = mongoose.model("Post",postSchema)
module.exports = Post;