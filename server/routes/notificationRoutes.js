import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { deleteNotification, getUserNotifications, markAsRead } from '../controllers/notificationController.js';


const router = express.Router()
router.get("/userNotifications", protectRoute, getUserNotifications)

router.put("/notification/:id/read", protectRoute, markAsRead)

router.delete("/deleteNotification", protectRoute, deleteNotification)

export default router