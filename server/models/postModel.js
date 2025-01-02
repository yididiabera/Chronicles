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
        image : {
            type : String,
            default: null,
        },
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    } , {timestamps: true}
)

const Post = mongoose.model('Post', PostSchema)
export default Post;