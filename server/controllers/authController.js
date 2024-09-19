import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"
import bcrypt from 'bcryptjs'

export const signup = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const existingEmail = await userModel.findOne({ email })
        if (existingEmail) {
            res.status(400).json({ message: "Email already present. Please try with newone" })
        }

        const existingUsername = await userModel.findOne({ username })
        if (existingUsername) {
            res.status(400).json({ message: "Username already taken by someone. Please try with newone" })
        }

        if (password.length < 6) {
            res.status(400).json({ message: "Password must contain 6 degits" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new userModel({
            name, username, email, password: hashedPassword
        })

        await user.save();

        const token = await jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "15d" })

        res.cookie("jwt-token", token, {
            httpOnly: true, //prevent XSS attact
            maxAge: 15 * 24 * 60 * 60 * 1000,
            sameSite: "strict", //prevent CSRF attack,
            secure: process.env.NODE_ENV === "production", //protects man-in-middle attack
        })

        res.status(201).json({ message: "User created successfully" })

        // todo: welcome mail

    } catch (error) {
        console.log("Error while signup:", error.message);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


export const login = async (req, res) => { }
export const logout = async (req, res) => { }