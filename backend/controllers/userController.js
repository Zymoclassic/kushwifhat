import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


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

export const changeDp = async (req, res, next) => {
    try {
        res.json(req.files)
        console.log(req.files)
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