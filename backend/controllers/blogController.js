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
    return res.status(201).json({blog});
};

export const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return res.status(500).json({message: "Error! A blockade was encountered."});
    }
    if (!blog) {
        return res.status(404).json({message: "The blog you are trying to locate doesn't exist."});
    }
    return res.status(200).json({blog});
}

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        }, {new: true});
    } catch(err) {
        return res.status(500).json({message: "Error! A blockade was encountered."});
    }
    if (!blog) {
        return res.status(404).json({message: "The blog you are trying to locate doesn't exist."});
    }
    return res.status(200).json({blog});
};

