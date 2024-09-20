import { vs as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOU_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_CLOU_SEC,
})

export default cloudinary;