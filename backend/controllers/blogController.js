const Blog = require("../model/Blog");
const User = require("../model/User");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const { fileURLToPath } = require("url");
const dotenv = require("dotenv");
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all available blogs
const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().sort({ updatedAt: -1 });
    } catch (err) {
        return res.status(500).json({ message: "ERROR!!! Blogs processing interrupted." });
    }
    if (!blogs) {
        return res.status(404).json({ message: "ERROR!!! Blogs not found." });
    }
    return res.status(200).json({ blogs });
};

// Add blog, but verify user before adding
const addBlog = async (req, res, next) => {
    const { title, description, category, user } = req.body;
    const { image } = req.files;
    let existingUser;
    try {
        if (!title || !description || !category || !user || !image) {
            return res.status(422).json({ message: "Fill in all empty field(s) and upload an image." });
        }

        // Check the file size
        if (image.size > 2000000) {
            return res.status(400).json({ message: "File too large, Please upload something lesser than 2mb." });
        }

        // Check file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedTypes.includes(image.mimetype)) {
            return res.status(400).json({ message: "Invalid file type. Please upload a valid image." });
        }

        // Rename file
        let fileName = image.name;
        let modFileName = fileName.split(".");
        let newFileName = `${modFileName[0]}_${uuid()}.${modFileName.pop()}`;

        // Upload file
        image.mv(path.join(__dirname, "..", "uploads", newFileName), async (err) => {
            if (err) {
                return res.status(400).json({ message: "Error encountered while uploading file." });
            }
        });

        existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "This user cannot be found." });
        }
        const blog = new Blog({
            title,
            category,
            description,
            image: newFileName,
            user,
        });

        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            await blog.save({ session });
            existingUser.blogs.push(blog);
            await existingUser.save({ session });
            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            return res.status(500).json({ message: "Error! Blog can not be saved." });
        } finally {
            session.endSession();
        }

        return res.status(201).json({ blog });
    } catch (err) {
        return res.status(500).json({ message: "We encountered an error trying to process the request." });
    }
};

// Get a particular blog
const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (err) {
        return res.status(500).json({ message: "Error! A blockade was encountered." });
    }
    if (!blog) {
        return res.status(404).json({ message: "The blog you are trying to locate doesn't exist." });
    }
    return res.status(200).json({ blog });
};

// Get blog by Category
const getByCategory = async (req, res, next) => {
    const { category } = req.params;
    let postCategory;
    try {
        postCategory = await Blog.find({ category }).sort({ createdAt: -1 });
    } catch (err) {
        return res.status(500).json({ message: "Error! A blockade was encountered." });
    }
    if (!postCategory) {
        return res.status(404).json({ message: "The category you are trying to locate doesn't exist." });
    }
    return res.status(200).json({ postCategory });
};

// Get all blogs by a particular user
const getAllUserBlog = async (req, res, next) => {
    let userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).select("-password").populate("blogs");
    } catch (err) {
        return res.status(500).json({ message: "An error occurred! Please try again." });
    }
    if (!userBlogs) {
        return res.status(400).json({ message: "This is not a valid user" });
    }
    return res.status(200).json({ userInfo: userBlogs });
};

// Edit blog
const updateBlog = async (req, res, next) => {
    const { title, description, category } = req.body;
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: "The blog you are trying to locate doesn't exist." });
        }

        if (!blog.user.equals(new mongoose.Types.ObjectId(req.user.id))) {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        if (!title || !description || !category) {
            return res.status(422).json({ message: "Please fill all blank fields." });
        }

        const image = req.files?.image;
        if (image) {
            if (image.size > 2000000) {
                return res.status(400).json({ message: "File too large. Please upload something smaller than 2MB." });
            }

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            if (!allowedTypes.includes(image.mimetype)) {
                return res.status(400).json({ message: "Invalid file type. Please upload a valid image." });
            }

            if (blog.image) {
                const oldImagePath = path.join(__dirname, "..", "uploads", blog.image);
                try {
                    await fs.promises.unlink(oldImagePath);
                } catch (err) {
                    console.error("Failed to delete existing image:", err);
                }
            }

            const modFileName = image.name.split(".");
            const newFileName = `${modFileName[0]}_${uuid()}.${modFileName.pop()}`;
            const uploadPath = path.join(__dirname, "..", "uploads", newFileName);
            await image.mv(uploadPath);

            blog.image = newFileName;
        }

        blog.title = title;
        blog.description = description;
        blog.category = category;

        const updatedBlog = await blog.save();

        return res.status(200).json({ message: "Blog updated successfully.", blog: updatedBlog });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
};

// Delete Blog
const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId).populate("user");
        if (!blog) {
            return res.status(404).json({ message: "The blog you are trying to locate doesn't exist." });
        }

        if (!blog.user.equals(new mongoose.Types.ObjectId(req.user.id))) {
            return res.status(403).json({ message: "Unauthorized action." });
        }

        if (blog.image) {
            const filePath = path.join(__dirname, "..", "uploads", blog.image);
            try {
                await fs.promises.unlink(filePath);
            } catch (err) {
                console.error("Error deleting the image file:", err);
                return res.status(500).json({ message: "Failed to delete the associated image file." });
            }
        }

        await Blog.findByIdAndDelete(blogId);

        blog.user.blogs.pull(blog);
        await blog.user.save();

        return res.status(200).json({ message: "Blog successfully deleted." });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred. Please try again later." });
    }
};

module.exports = {
    getAllBlogs,
    addBlog,
    getById,
    getByCategory,
    getAllUserBlog,
    updateBlog,
    deleteBlog,
};
