import express from "express";
import { getAllUser, signUp, logIn, getUser, changeDp, editUserDetails } from "../controllers/userController.js";
import { authMiddleware } from "../utils/authMiddleware.js";

const router = express.Router();

// Define all the routes for the "/api/user" and the corresponding http request
router.get('/', getAllUser);
router.get('/:id', getUser);
router.post('/signup', signUp);
router.post('/login', logIn );
router.post('/changedp', authMiddleware, changeDp);
router.patch('/editdetails', authMiddleware, editUserDetails);

export default router;

