import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        bannerImage: {
            type: String,
            default: ""
        },
        headline: {
            type: String,
            default: "ConnectIn User"
        },
        location: {
            type: String,
            default: ""
        },
        about: {
            type: String,
            default: ""
        },
        skills: [String],
        experience: [
            {
                title: String,
                startDate: Date,
                endDate: Date,
                description: String
            }
        ],
        education: [
            {
                school: String,
                feildOfStudy: String,
                startYear: Number,
                endYear: Number
            }
        ],
        connections: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]


    },
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema)
export default userModel