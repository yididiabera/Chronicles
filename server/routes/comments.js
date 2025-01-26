import express from 'express';
import Comment from '../models/commentModel.js';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET comments for a specific post
router.get('/:postId', async (req, res) => {
  try {
    //console.log(`Fetching comments for post ID: ${req.params.postId}`);
    const comments = await Comment.find({ postId: req.params.postId }).populate('author', 'name email');
    if (!comments) {
      return res.status(404).json({ message: 'No comments found for this post' });
    }
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: 'Error fetching comments', error: err.message });
  }
});

// POST a new comment
router.post('/:postId', verifyToken, async (req, res) => {
    console.log("Decoded Author ID (req.user.id):", req.user.id);
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    const userId = req.user.id.toString();
    
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({message: "User not found!"})
    }

    //console.log(`Adding comment to post ID: ${req.params.postId}`);
    const newComment = new Comment({
      postId: req.params.postId,
      author: req.user.id,
    content,
    });

    const savedComment = await newComment.save();

    // Add the comment ID to the associated post
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: 'Error adding comment', error: err.message });
  }
});

// DELETE a comment
router.delete('/:commentId', verifyToken, async (req, res) => {
  try {
    console.log(`Deleting comment with ID: ${req.params.commentId}`);
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      console.error("Comment not found:", req.params.commentId);
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Remove the comment reference from the associated post
    await Post.findByIdAndUpdate(comment.postId, {
      $pull: { comments: comment._id },
    });

    // Delete the comment
    await comment.remove();
    console.log(`Comment deleted with ID: ${req.params.commentId}`);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: 'Error deleting comment', error: err.message });
  }
});

export default router;

