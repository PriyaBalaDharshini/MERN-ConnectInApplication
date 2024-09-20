import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { getPublicProfile, getSuggestedConnections, updateProfile } from '../controllers/userController.js';

const router = express.Router()

//getting suugestion for current user
router.get("/suggestion", protectRoute, getSuggestedConnections)

//getting public profile for cuuret user
router.get("/:username", protectRoute, getPublicProfile)

//profile update
router.put("/profile", protectRoute, updateProfile)


export default router