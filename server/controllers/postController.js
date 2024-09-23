import cloudinary from "../lib/cloudinary.js";
import PostModel from "../models/postModel.js"

export const getFeedPosts = async (req, res) => {
    try {
        const posts = await PostModel.find({ author: { $in: req.user.connections } })
            .populate("author", "name username profilePicture headline")
            .populate("comments.user", "name profilePicture")
            .sort({ createdAt: -1 })

        res.status(200).json(posts)
    } catch (error) {
        console.log("Error in getting post feeds:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createPost = async (req, res) => {
    try {
        const { image, content } = req.body;
        let newPost;
        if (image) {
            const imageResult = await cloudinary.uploader.upload(image)
            newPost = new PostModel.create({
                author: req.user._id,
                content,
                image: imageResult.secure_url
            })
        } else {
            newPost = new PostModel.create({
                author: req.user._id,
                content,
            })
        }
        await newPost.save()
        res.status(201).json(newPost)

    } catch (error) {
        console.log("Error in creating new post:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.body._id;

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        //to check the current user is the author of this post
        if (post.author.toString() != userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        if (post.image) {
            await cloudinary.uploader.destroy(post.image.split("/").pop().split(".")[0])
        }
        await PostModel.findByIdAndDelete(postId)
        res.status(200).json({ message: "Post Deleted Successsfully" })

    } catch (error) {
        console.log("Error in deleting post:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await PostModel.findById(postId)
            .populate("author", "name username profilePicture headline")
            .populate("comments.user", "name profilePicture username headline")

        res.status(200).json(post)
    } catch (error) {
        console.log("Error in getting post by id post:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const { content } = req.body;

        const post = await Post.findByIdAndUpdate(
            postId,
            {
                $push: { comments: { user: req.user._id, content } },
            },
            { new: true }
        ).populate("author", "name email username headline profilePicture");




        res.status(200).json(post);
    } catch (error) {
        console.log("Error in while creating your comment", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}