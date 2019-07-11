import express from "express";
import User from "../controllers/userController";


const router = express.Router();


router.post('/auth/signup', User.create);


export default router;