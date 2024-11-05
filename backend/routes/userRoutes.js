import express from "express";
import { getAllUser, signUp } from "../controllers/userController.js";

const router = express.Router();

router.get('/', getAllUser);
router.post('/signup', signUp);

export default router;