import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import { sendWelcomeEmail } from "../email/emailHandler.js";

export const signup = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        if (!name || !email || !password || !username) {
            return res.status(400).json({ message: "All feilds are required" })
        }

        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "Email already present. Please try with newone" })
        }

        const existingUsername = await userModel.findOne({ username })
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken by someone. Please try with newone" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must contain at least 6 characters" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name, username, email, password: hashedPassword
        })

        await user.save();

        let token;
        try {
            token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "15d" });
        } catch (err) {
            return res.status(500).json({ message: "Token generation failed." });
        }

        // Set JWT as a cookie
        res.cookie("jwt-token", token, {
            httpOnly: true, //prevent XSS attact
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict", //prevent CSRF attack,
            secure: process.env.NODE_ENV === "production", //protects man-in-middle attack
        })

        res.status(201).json({ message: "User created successfully" })

        const profileUrl = `${process.env.CLIENT_URL}/profile/${user.username}`
        // todo: welcome mail

        /*  try {
             await sendWelcomeEmail(user.name, user.email, profileUrl)
         } catch (error) {
             console.log("Error sending welcome email", error);
         } */



    } catch (error) {
        console.log("Error while signup:", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All feilds are required" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found. Please register" })
        }
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        let token;
        try {
            token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "15d" });
        } catch (err) {
            return res.status(500).json({ message: "Token generation failed." });
        }

        // Set JWT as a cookie
        res.cookie("jwt-token", token, {
            httpOnly: true, //prevent XSS attact
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict", //prevent CSRF attack,
            secure: process.env.NODE_ENV === "production", //protects man-in-middle attack
        })

        res.status(201).json({ message: "Login Successfull" })

    } catch (error) {
        console.log("Error while login:", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwt-token")

    res.json({ message: "Loggedout successfully" })
}