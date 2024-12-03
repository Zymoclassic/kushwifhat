import express from "express";
import { getAllUser, signUp, logIn, getUser, changeDp, editUserDetails } from "../controllers/userController.js";

const router = express.Router();

// Define all the routes for the "/api/user" and the corresponding http request
router.get('/', getAllUser);
router.get('/:id', getUser);
router.post('/signup', signUp);
router.post('/login', logIn );
router.post('/:id/changedp', changeDp);
router.patch('/:id/editdetails', editUserDetails);

export default router;