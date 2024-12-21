import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const auth = req.cookies.authToken;

    if (!auth) {
        return res.status(401).json({message: " Not authorized, no token."})
    }

    try {
        const verifyUser = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = verifyUser;
        next();
        } catch (err) {
            console.log(err)
            return res.status(403).json({message: "Unauthorized user."});
    }
};


