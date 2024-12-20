import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const Auth = req.headers.Authorization || req.headers.authorization;

    if (Auth && Auth.startsWith("Bearer")) {
        const token = Auth.split(' ')[1]

        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if(err) {
                return res.status(403).json({message: "Unauthorized user."})
            }

            req.user = info;
            next()
        })
    }
    else {
        return res.status(402).json({message: "Error encountered while processing the information."})
    }
}