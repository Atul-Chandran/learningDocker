const Post = require("../models/post.model")
exports.getAllPosts = async (req,res,next) => {
    try{
        const posts = await Post.find();
        res.status(200).json({
            status: 'success',
            data: posts,
            results: posts.length
        })
    }
    catch(e) {
        res.send(403).json({
            status: 'failed'
        })
        console.log("Error ",e)
    }
}

exports.getIndividualPost = async (req,res,next) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: post
        })
    }
    catch(e) {
        res.send(403).json({
            status: 'failed'
        })
        console.log("Error ",e)
    }
}

exports.createPost = async(req,res,next) => {
    console.log("Body ",req.body)
    try{
        const posts = await Post.create(req.body);
        res.status(200).json({
            status: 'success',
            data: posts
        })
    }
    catch(e) {
        res.send(403).json({
            status: 'failed'
        })
        console.log("Error ",e)
    }
}

exports.updatePost = async(req,res,next) => {
    try{
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: posts,
            results: posts.length
        })
    }
    catch(e) {
        res.send(403).json({
            status: 'failed'
        })
        console.log("Error ",e)
    }
}

exports.deletePost = async(req,res,next) => {
    try{
        const posts = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success'
        })
    }
    catch(e) {
        res.send(403).json({
            status: 'failed'
        })
        console.log("Error ",e)
    }
}