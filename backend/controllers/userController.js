import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { v4 as uuid} from 'uuid';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// gets all users
export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find().select('-password');
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
    if(!users) {
        return res.status(404).json({ message: "No user found!"});
    }
    return res.status(200).json({ users });
};

// create account
export const signUp = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!name || !email || !password ) {
        return res.status(400).json({message: "Fill in all details"});
    }

    // convert email to lowercase
    const newEmail = email.toLowerCase();

    // check if user is pre-existing
    let existingUser;
    try {
        existingUser = await User.findOne({ email: newEmail });
    }
    catch (err) {
        return res.status(500).json({message: "ERROR!!! Validation interrupted"});
    }
    if (existingUser) {
        return res.status(400).json({message: "Pre-existing User, Please use the Login page instead."})
    }

    if((password.trim()).length < 8 ) {
        return res.status(400).json({message: "Password is too short."})
    }

    if(password !== confirmPassword) {
        return res.status(400).json({message: "Passwords doesn't match."})
    }

    const salt = await bcrypt.genSalt(10)
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, salt);
    } catch (err) {
        return res.status(500).json({ message: "Error! Please try again." });
    }

    const user = new User({
        name,
        email: newEmail,
        password: hashedPassword,
        blogs: []
    });
    try {
        await user.save();
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process data"});
    }
    return res.status(201).json({user, message: "Account successfully created. Welcome to the Kushwifhat Family."})
}

// login
export const logIn = async (req, res, next) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.status(400).json({message: "Fill in all details."});
    }

    const newEmail = email.toLowerCase();

    let existingUser;
    try {
        existingUser = await User.findOne({ email: newEmail });
    }
    catch (err) {
        return res.status(500).json({message: "ERROR!!! Validation interrupted"});
    }
    if (!existingUser) {
        return res.status(404).json({message: "Email or Password is invalid."});
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(404).json({message: "Email or Password is invalid."});
    }

    const { _id: id, name} = existingUser;
    const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("authToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 1000
    })

    return res.status(200).json({message: "Login successful", id, name})
}

// check user profile
export const getUser = async (req, res, next) => {
    
    const id = req.params.id;
    let user;
    try {
        user = await User.findById(id).select('-password');
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
    if(!user) {
        return res.status(404).json({ message: "The user can not be found!"});
    }
    return res.status(200).json({ user });
};


export const changeDp = async (req, res, next) => {
    try {
        if(!req.files || !req.files.image) {
            return res.status(422).json({message: "Please select an image."})
        }

        const {image} = req.files;

        //check the file size
        if(image.size > 2000000) {
            return res.status(400).json({message: "File too large, Please upload something lesser that 2mb."})
        }

        //check file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        if (!allowedTypes.includes(image.mimetype)) {
            return res.status(400).json({ message: "Invalid file type. Please upload a valid image." });
        }

        // check if user is authorized
        const user = await User.findById(req.user.id)

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        //delete pre-existing dp
        if(user.image) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.image), (err) => {
                if(err) {
                    return res.status(400).json({message: "An error occured, Please try again later."})
                }
            })
        }

        //rename file
        let fileName;
        fileName = image.name;
        let modFileName = fileName.split('.');
        let newFileName = `${modFileName[0]}_${uuid()}.${modFileName.pop()}`;

        // upload file
        image.mv(path.join(__dirname, '..', 'uploads', newFileName),  async (err) => {
            if(err) {
                return res.status(400).json({message: "Error encountered while uploading file."})
            }

            try {
                // Update user record
                const updatedImage = await User.findByIdAndUpdate(
                    req.user.id,
                    { image: newFileName },
                    { new: true }
                );
                if (!updatedImage) {
                    return res.status(400).json({ message: "Error updating user image." });
                }
                return res.status(200).json({ message: "File successfully uploaded.", image: newFileName });
            } catch (err) {
                return res.status(500).json({ message: "An error occurred while updating the image." });
            }
        })

    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
};



// update user details
export const editUserDetails = async (req, res, next) => {  
    
    try {
        const { name, email, currentPassword, newPassword, confirmNewPassword } = req.body;
        if(!name || !email || !currentPassword || !newPassword || !confirmNewPassword) {
            return res.status(422).json({message: "Fill all blank fields."})
        }

        //fetch user from database
        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(403).json({message: "Specified user not found."})
        }

        //confirm email doesn't exist already
        const newEmail = email.toLowerCase();
        const emailValidation = await User.findOne({email: newEmail})
        if(emailValidation && (emailValidation._id.toString() !== req.user.id)) {
            return res.status(422).json({message: "Pre-existing email address, Please use another one."})
        }

        //validate current password
        const passwordValidation = await bcrypt.compare(currentPassword, user.password)
        if(!passwordValidation) {
            return res.status(422).json({message: "Current password is invalid."})
        }

        if(newPassword !== confirmNewPassword) {
            return res.status(422).json({message: "new passwords doesn't match."})
        }

        //hash new password
        const salt = await bcrypt.genSalt(10)
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(newPassword, salt);
        } catch (err) {
            return res.status(500).json({ message: "Error! Please try again." });
        }

        //Update database information
        const newUserInfo = await User.findByIdAndUpdate(req.user.id, {name, email: newEmail, password: hashedPassword}, {new: true})
        res.status(200).json(newUserInfo)
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
};

