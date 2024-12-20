import express from "express";
import Blog from "../model/Blog.js";
import User from "../model/User.js";
import mongoose from "mongoose";

// Get all available blogs
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


//Add blog, but verify user before adding
export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (err) {
        return res.status(500).json({message: "We encountered an error trying to process the request."});
    }
    if(!existingUser) {
        return res.status(400).json({message: "This user cannot be found."})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        return res.status(500).json({message: "Error! Blog can not be saved."});
    }
    return res.status(201).json({blog});
};

//Get a particular blog
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

//Get blog by Category
export const getByCategory = async (req, res, next) => {
    res.json("Get blogs by category")
}

//Get all blogs by a particular user
export const getAllUserBlog = async (req, res, next) => {
    let userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return res.status(500).json({message: "An error occurred! Please try again."});
    }
    if(!userBlogs) {
        return res.status(400).json({message: "This is not a valid user"});
    }
    return res.status(200).json({blogs: userBlogs});
}

//Edit blog
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

// Delete Blog
export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return res.status(500).json({message: "Error! A blockade was encountered."});
    }
    if (!blog) {
        return res.status(404).json({message: "The blog you are trying to locate doesn't exist."});
    }
    return res.status(200).json({message: "Successfully deleted."});
}