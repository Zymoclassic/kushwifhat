import express from "express";
import mongoose from "mongoose";

const app = express();


mongoose.connect("mongodb+srv://Zymo:gly20171025@cluster.sqpsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")
.then(() => app.listen(4000))
.then(() => console.log("Connection successful please check port 4000!"))
.catch((err) => console.log(err));

app.listen(5000);
