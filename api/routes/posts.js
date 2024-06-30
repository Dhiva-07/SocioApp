const router = require("express").Router();
const Post = require("../models/post");
const User = require("../models/user");
router.post("/" , async(req,res)=>{
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/:id" , async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.updateOne({$set : req.body});
            res.status(200).json("Post has been updated!");
        }else{
            res.status(403).json("You can update your Posts only")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.delete("/:id" , async(req,res)=>{
    const post = await Post.findById(req.params.id);
    try{
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("Post has been deleted!");
        }else{
            res.status(403).json("You can delete your Posts only")
        }
    }catch(err){
        res.status(500).json(err);
    }
})

router.put("/:id/like" , async(req ,res) =>{
    try{
    const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push : {likes : req.body.userId}});
        res.status(200).json("Post has been liked");
    }
    else{
        await post.updateOne({$pull : {likes : req.body.userId}});
        res.status(200).json("Post has been disliked");
    }
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/:id" , async(req , res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/timeline/:userId" , async(req ,res)=>{
    try{
        const currUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({userId : currUser._id});
        const friendPosts = await Promise.all(
            currUser.followings.map((friendId)=>{
                return Post.find({userId : friendId});
            })
        );
        const allPosts = userPosts.concat(...friendPosts);
        console.log("All Posts:", allPosts);
        res.status(200).json(allPosts);
    }catch(err){
        res.status(500).json(err);
    }
})

router.get("/profile/:username" , async(req ,res)=>{
    try{
        const user = await User.findOne({username : req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;