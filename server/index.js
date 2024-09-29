import express from "express"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import connectionRequestRoutes from "./routes/connectionRequestRoutes.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8001;
const DB = process.env.DB_URL

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({ limit: "5mb" }))
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/post", postRoutes)
app.use("/notification", notificationRoutes)
app.use("/connection", connectionRequestRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to backend of LinkedIn like Application");
})

mongoose.connect(DB).then(() => console.log("Database connected successfully")).catch((error) => console.log(error))
app.listen(PORT, () => console.log(`Server connected to ${PORT}`));