import express from "express";
import { getAllUser, signUp, logIn } from "../controllers/userController.js";

const router = express.Router();

// Define all the routes for the "/api/user" and the corresponding http request
router.get('/', getAllUser);
router.post('/signup', signUp);
router.post('/login', logIn );

export default router;