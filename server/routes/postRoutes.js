import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { createPost, deletePost, editPost, getFeedPosts, getPostById } from '../controllers/postController.js';

const router = express.Router()

router.get("/feedPosts", protectRoute, getFeedPosts)

router.post("/createPost", protectRoute, createPost)

router.delete("/deletePost", protectRoute, deletePost)

router.get("/getPost/:id", protectRoute, getPostById)

router.put("/editPost/:id", protectRoute, editPost);

export default router