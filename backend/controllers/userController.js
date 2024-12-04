import User from "../model/User.js";
import bcrypt from "bcryptjs";


// gets all users
export const getAllUser = async (req, res, next) => {
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
        return res.status(500).json({message: "Password is too short."})
    }

    if(password !== confirmPassword) {
        return res.status(500).json({message: "Passwords doesn't match."})
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hashSync(password);
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
        return res.status(400).json({message: "Fill in all details"});
    }

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    }
    catch (err) {
        return res.status(500).json({message: "ERROR!!! Validation interrupted"});
    }
    if (!existingUser) {
        return res.status(404).json({message: "User can not be found."});
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    if (!isPasswordCorrect) {
        return res.status(404).json({message: "Password is not valid."});
    }
    return res.status(200).json({message: `User ${existingUser.name} has been logged in successfully`});
}

// check user profile
export const getUser = async (req, res, next) => {
    let user;
    let id = req.body
    try {
        user = await User.findById(id);
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process it."});
    }
    if(!user) {
        return res.status(404).json({ message: "The user can not be found!"});
    }
    return res.status(200).json({ user });
};

// change user avatar
export const changeDp = async (req, res, next) => {
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