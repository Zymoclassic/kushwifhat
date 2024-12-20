import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { v4 as uuid} from 'uuid';
import { fileURLToPath } from 'url';

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

    return res.status(200).json({token, id, name})
}

// check user profile
export const getUser = async (req, res, next) => {
    let user;
    let id = req.body
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

// export const changeDp = async (req, res, next) => {
//     try {

//         // Validate file
//         if (!req.files || !req.files.image) {
//             return res.status(422).json({ message: "Please select an image." });
//         }

//         const { image } = req.files;

//         // Check file size
//         if (image.size > 2000000) {
//             return res.status(400).json({ message: "File too large. Please upload a file less than 2MB." });
//         }

//         // Validate file type
//         const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
//         if (!allowedTypes.includes(image.mimetype)) {
//             return res.status(400).json({ message: "Invalid file type. Please upload a valid image." });
//         }

//         // Check user
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         // Delete existing image
//         if (user.image) {
//             try {
//                 fs.unlinkSync(path.join(__dirname, '..', 'uploads', user.image));
//             } catch (err) {
//                 return res.status(500).json({ message: "An error occurred while deleting the previous image." });
//             }
//         }

//         // Rename and move file
//         const fileNameParts = image.name.split('.');
//         const newFileName = `${fileNameParts[0]}_${uuid()}.${fileNameParts.pop()}`;

//         image.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
//             if (err) {
//                 return res.status(500).json({ message: "Error uploading the file." });
//             }

//             try {
//                 // Update user record
//                 const updatedImage = await User.findByIdAndUpdate(
//                     req.user.id,
//                     { image: newFileName },
//                     { new: true }
//                 );
//                 if (!updatedImage) {
//                     return res.status(400).json({ message: "Error updating user image." });
//                 }
//                 return res.status(200).json({ message: "File successfully uploaded.",  });
//             } catch (updateErr) {
//                 return res.status(500).json({ message: "An error occurred while updating the image." });
//             }
//         });
//     
// };


export const changeDp = async (req, res, next) => {
    try {
        if(!req.files || !req.files.image) {
            return res.status(422).json({message: "Please select an image."})
        }

        // check if user is authorized
        const user = await User.findById(req.user.id)

        //delete pre-existing dp
        if(user.image) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.image), (err) => {
                if(err) {
                    return res.status(400).json({message: "An error occured, Please try again later."})
                }
            })
        }

        const {image} = req.files;

        //check the file size
        if(image.size > 2000000) {
            return res.status(400).json({message: "File too large, Please upload something lesser that 2mb."})
        }

        //rename file
        let fileName;
        fileName = image.name;
        let modFileName = fileName.split('.');
        let newFileName = modFileName[0] + uuid() + '.' + modFileName[modFileName.length - 1];

        // upload file
        image.mv(path.join(__dirname, '..', 'uploads', newFileName),  async (err) => {
            if(err) {
                return res.status(400).json({message: "Error encountered while uploading file."})
            }

            const updatedImage = await User.findByIdAndUpdate(req.user.id, {image: newFileName}, {new: true})
            if(!updatedImage) {
                return res.status(400).json({message: "Error encountered while uploading file."})
            }
            return res.status(200).json({message: "File successfully uploaded.", image: newFileName})
        })

    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
};



// update user details
export const editUserDetails = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
    if(!users) {
        return res.status(404).json({ message: "The user can not be found!"});
    }
    return res.status(200).json({ users });
};