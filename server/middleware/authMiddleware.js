import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies["jwt-token"];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify token
        const tokenDecode = await jwt.verify(token, process.env.JWT_KEY);
        if (!tokenDecode) {
            return res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
        }

        // Find user by decoded userId
        const user = await userModel.findById(tokenDecode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Add user data to request object for further use
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in Middleware", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
