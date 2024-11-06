import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({ message: "The user can not be found!"});
    }
    return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    }
    catch (err) {
        return res.status(500).json({message: "ERROR!!! Validation interrupted"});
    }
    if (existingUser) {
        return res.status(400).json({message: "Pre-existing User, Please use the Login page instead."})
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hashSync(password);
    } catch (err) {
        return res.status(500).json({ message: "Error! Please try again." });
    }

    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        await user.save();
    } catch (err) {
        return res.status(500).json({message: "ERROR!!! Can not process data"});
    }
    return res.status(201).json({user, message: "Account successfully created. Welcome to the Kushwifhat Family."})
}

export const logIn = async (req, res, next) => {
    const { email, password } = req.body;

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