import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById, deleteBlog, getAllUserBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

// Define all the routes for the "/posts" and the corresponding http request
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.get("user/:id", getAllUserBlog);
blogRouter.post("/create", addBlog);
blogRouter.put("/:id/edit", updateBlog);
blogRouter.delete("/:id/delete", deleteBlog);

export default blogRouter;
