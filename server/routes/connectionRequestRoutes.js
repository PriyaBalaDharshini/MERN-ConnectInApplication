import express from 'express';
import { protectRoute } from '../middleware/authMiddleware.js';
import { acceptConnectionRequest, getConnectionRequests, getConnectionStatus, getUserConnections, rejectConnectionRequest, removeConnection, sendConnectionRequest } from '../controllers/connectionRequestController.js';

const router = express.Router()

router.post("/request/:userId", protectRoute, sendConnectionRequest);
router.put("/accept/:requestId", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);

// Get all connection requests for the current user
router.get("/requests", protectRoute, getConnectionRequests);

// Get all connections for a user
router.get("/allConnections", protectRoute, getUserConnections);
router.delete("/connectionReq/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus);

export default router