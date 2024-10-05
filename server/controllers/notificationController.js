import NotificationModel from "../models/notificationModel.js";

export const getUserNotifications = async (req, res) => {
    try {
        const notifications = await NotificationModel.find({ recipient: req.user._id })
            .sort({ createdAt: -1 })
            .populate("relatedUser", "name username profilePicture")
            .populate("relatedPost", "content image");

        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error in getUserNotifications controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const markAsRead = async () => {
    const notificationId = req.params.id;
    try {
        const notification = await NotificationModel.findByIdAndUpdate(
            { _id: notificationId, recipient: req.user._id },
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        console.error("Error in markNotificationAsRead controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const deleteNotification = async () => {
    const notificationId = req.params.id;

    try {
        await Notification.findOneAndDelete({
            _id: notificationId,
            recipient: req.user._id,
        });

        res.json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}