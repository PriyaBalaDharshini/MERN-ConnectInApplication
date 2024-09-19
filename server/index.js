import express from "express"
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8001;
const DB = process.env.DB_URL

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to backend of LinkedIn like Application");
})

mongoose.connect(DB).then(() => console.log("Database connected successfully")).catch((error) => console.log(error))
app.listen(PORT, () => console.log(`Server connected to ${PORT}`));