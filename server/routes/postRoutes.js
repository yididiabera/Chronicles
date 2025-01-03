import express from "express";
import {
createPost, getPosts, getPostById, updatePostById, deleteById
} from "../controllers/postController.js"
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post('/', verifyToken, createPost)
router.get('/', getPosts)
router.get('/:id', getPostById)
router.put('/:id', verifyToken, updatePostById)
router.delete('/:id', verifyToken, deleteById)

export default router;