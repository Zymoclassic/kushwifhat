import express from "express";
import mongoose from "mongoose";
import mongodb from "./mongodb.js";
import router from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);

mongoose.connect(mongodb)
.then(() => app.listen(4000))
.then(() => console.log("Connection successful please check port 4000!"))
.catch((err) => console.log(err));
