import express from "express";
import { getAllUser, signUp, logIn } from "../controllers/userController.js";

const router = express.Router();

router.get('/', getAllUser);
router.post('/signup', signUp);
router.post('/login', logIn );

export default router;