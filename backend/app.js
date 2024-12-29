import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import dotenv from 'dotenv';
import fileUpload from "express-fileupload";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { notFound, errorHandler } from "./utils/errorMiddleware.js";
import { authMiddleware } from "./utils/authMiddleware.js";
dotenv.config();

const app = express();

// File paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "uploads");

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}))
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(fileUpload({createParentPath: true}));
app.use('/uploads', express.static(uploadDir));

// Routes
app.use("/api/user", router);
app.use("/api/posts", blogRouter);
app.get("/api/test-error", (req, res) => {
    throw new Error("Test Server Error");
});
app.use(notFound);
app.use(errorHandler);


// Check if folder exists, If not then create the folder.
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(process.env.PORT))
.then(() => console.log(`Connection successful please check port ${process.env.PORT}!`))
.catch((err) => console.log(err));

export default app;