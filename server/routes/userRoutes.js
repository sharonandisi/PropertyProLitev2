import express from "express";
import User from "../server/controllers/userController";


const router = express.Router();


router.post('/auth/signup', User.create);


export default router;