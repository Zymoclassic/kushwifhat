import express from "express";
import { addBlog, getAllBlogs, updateBlog, getById, getByCategory, deleteBlog, getAllUserBlog } from "../controllers/blogController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const blogRouter = express.Router();

// Define all the routes for the "/posts" and the corresponding http request
blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.get("/categories/:category", getByCategory);
blogRouter.get("user/:id", getAllUserBlog);
blogRouter.post("/create", authMiddleware, addBlog);
blogRouter.put("/:id/edit", authMiddleware, updateBlog);
blogRouter.delete("/:id/delete", authMiddleware, deleteBlog);

export default blogRouter;
