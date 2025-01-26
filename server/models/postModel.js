import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content : {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        imageUrl : {
            type : String,
            default: null,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment', // Reference the Comment model
            },
    ],
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        publishedDate: {
            type: Date,
            default: Date.now
        }
    } , {timestamps: true}
)

const Post = mongoose.model('Post', PostSchema)
export default Post;