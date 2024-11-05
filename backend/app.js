import express from "express";
import mongoose from "mongoose";
import mongodb from "./mongodb.js";

const app = express();


mongoose.connect(mongodb)
.then(() => app.listen(4000))
.then(() => console.log("Connection successful please check port 4000!"))
.catch((err) => console.log(err));
