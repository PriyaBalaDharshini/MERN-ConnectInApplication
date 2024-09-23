import express from "express"
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import notificationRoutes from "./routes/notificationRoutes.js"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8001;
const DB = process.env.DB_URL

//app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/post", postRoutes)
app.use("/notification", notificationRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to backend of LinkedIn like Application");
})

mongoose.connect(DB).then(() => console.log("Database connected successfully")).catch((error) => console.log(error))
app.listen(PORT, () => console.log(`Server connected to ${PORT}`));