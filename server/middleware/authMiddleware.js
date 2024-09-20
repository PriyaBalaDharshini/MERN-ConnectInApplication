import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-token"];
        if (!token) {
            return res.status(401).json({ message: "unauthorized - No Token Provided" });
        }

        const tokenDecode = await jwt.verify(token, process.env.JWT_KEY)
        if (!tokenDecode) {
            return res.status(401).json({ message: "unauthorized - Token Expired" });
        }
        const user = await userModel.findById(tokenDecode.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next()

    } catch (error) {
        console.log("Error in Middleware", error.message);
        re.status(500).json({ message: "Internal Server Error" })

    }
}