import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);

export default blogRouter;
