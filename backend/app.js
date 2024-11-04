import express from "express";
import mongoose from "mongoose";

const app = express();


mongoose.connect("")
.then(() => app.listen(4000))
.then(() => console.log("Connection successful please check port 4000!"))
.catch((err) => console.log(err));

app.listen(5000);
