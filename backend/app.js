import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import dotenv from 'dotenv';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: "http://localhost:3000"})); 
app.use("/user", router);
app.use("/posts", blogRouter);
app.use(notFound);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(process.env.PORT))
.then(() => console.log(`Connection successful please check port ${process.env.PORT}!`))
.catch((err) => console.log(err));
