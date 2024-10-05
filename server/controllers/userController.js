import cloudinary from "../lib/cloudinary.js";
import userModel from "../models/userModel.js";

export const getSuggestedConnections = async (req, res) => {
    try {

        const currentUser = await userModel.findById(req.user._id).select("connections");

        // Find users who are not already connected and also not recommend own profile
        const suggestUser = await userModel.find({
            _id: {
                $ne: req.user._id,           // Exclude the current user's own profile
                $nin: currentUser.connections // Exclude already connected users
            }
        }).select("name username profilePicture headline")
            .limit(3);

        return res.json(suggestUser); // Return after response to avoid continuing

    } catch (error) {
        console.log("Error in getting suggested users:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPublicProfile = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.params.username }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log("Error in getting public profile:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const allowedFields = [
            "name", "username", "headline", "about", "location",
            "profilePicture", "bannerImage", "skills", "experience", "education"
        ];

        const updatedData = {};

        // Correct typo: 'feild' -> 'field'
        for (const field of allowedFields) {
            if (req.body[field]) {
                updatedData[field] = req.body[field];
            }
        }

        if (req.body.profilePicture) {
            const result = await cloudinary.uploader.upload(req.body.profilePicture);
            updatedData.profilePicture = result.secure_url;
        }

        if (req.body.bannerImage) {
            const result = await cloudinary.uploader.upload(req.body.bannerImage);
            updatedData.bannerImage = result.secure_url;
        }


        const user = await userModel.findByIdAndUpdate(
            req.user._id,
            { $set: updatedData },
            { new: true }  // Return the updated document
        ).select("-password");

        return res.json(user);

    } catch (error) {
        console.error("Error in updateProfile controller:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
