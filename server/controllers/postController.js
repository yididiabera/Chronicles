import Post from '../models/postModel.js'
import multer from 'multer'

export const createPost = async(req, res, next) => {
  //console.log("Request Body:", req.body);
  //console.log("Headers:", req.headers);
  if (!req.user) {
  return res.status(401).json({ message: "Unauthorized, user not found" });
}


    try {
        const {title, content, tags, image} = req.body;

        if (!title || !content) {
            return res.status(400).json({message: 'Title and Content are required!'});
        }
    
        const newPost = new Post({
            title,
            content,
            tags: tags ? tags.split(',') : [],
            //image: req.file?.path,
            imageUrl: req.file ? `../uploads/${req.file.filename}` : null,
            author : req.user.id
        })
        
        const savedPost = await newPost.save();
        console.log(savedPost)
        res.status(201).json(savedPost);
    }
    catch (error){ 
        next(error)
    }
}

export const getPosts = async(req, res, next) => {
    try {
     const posts = await Post.find().populate("author", "username email")   
     res.status(200).json(posts)
    }
    catch (error) {
        next(error);
    }
}

export const getPostById = async(req, res, next) => {
    try {
        const {id} = req.params;

        const post = await Post.findById(id).populate('author', "username email") 

        if (!post) {
            return res.status(404).json({message: "Post Not Found!"})
        }
        //res.status(200).json(post)
        res.status(200).json({
        id: post._id,
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        authorName: post.author.username,
        authorEmail: post.author.email,
        publishedDate: post.publishedDate,
    });
    } catch(error) {
        next(error)
    }

}

export const updatePostById = async (req, res, next) => {
    try {
        const {id} = req.params;

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {$set: req.body},
            {new: true}
        )
        
        if(!updatedPost) {
            return res.status(404).json({message: "Page Not Found!"})
        }

        res.status(200).json(updatedPost)
    }
    catch(error) {
        next(error);
    }
}

export const deleteById = async(req, res, next) => {
    try {
        const {id} = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if(!deletedPost) {
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({message :"Post deleted successfully."}) 
    }
    catch(error) {
        next(error)
    }
}