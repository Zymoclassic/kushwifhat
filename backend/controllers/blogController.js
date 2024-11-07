import express from "express";
import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find();
    } catch(err) {
        return res.status(500).json({message: "ERROR!!! Blogss processing interrupted."});
    }
    if (!blogs) {
        return res.status(404).json({message: "ERROR!!! Blogs not found."});
    }
    return res.status(200).json( {blogs} );
};

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        await blog.save();
    } catch (err) {
        return res.status(500).json({message: "Error! Blog can not be saved."});
    }
    return res.status(200).json({blog});
}