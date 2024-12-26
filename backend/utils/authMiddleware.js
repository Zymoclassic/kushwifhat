import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
    const auth = req.cookies.authToken;

    if (!auth) {
        return res.status(401).json({message: " Not authorized,Please log-in again."})
    }

    try {
        const verifyUser = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = verifyUser;
        next();
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired." });
            }
            return res.status(403).json({message: "Unauthorized user."});
    }
};


