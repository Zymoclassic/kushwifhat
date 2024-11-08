import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

// Define all the routes for the "/api/blog" and the corresponding http request
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.delete("/:id", deleteBlog);

export default blogRouter;
