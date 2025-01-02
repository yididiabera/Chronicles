import Post from '../models/postModel.js'

export const createPost = async(req, res, next) => {
    try {
        const {title, content, tags, image} = req.body;

        if (!title || !content) {
            return res.status(400).json({message: 'Title and Content are required!'});
        }
    
        const newPost = new Post({
            title,
            content,
            tags,
            image,
            author : req.user.id
        })
        
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error){ 
        next(error)
    }
}