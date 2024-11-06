import express from "express";
import { getAllBlogs } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);

export default blogRouter;
