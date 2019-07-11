import express from "express";
import User from "../controllers/userController";
import Validations from "../middleware/userValidation";


const router = express.Router();


router.post('/auth/signup',Validations.validateSignup, User.create);


export default router;