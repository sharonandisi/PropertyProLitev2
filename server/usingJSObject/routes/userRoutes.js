import express from "express";
import User from "../controllers/userController";
import Validations from "../middleware/userValidation";


const router = express.Router();


router.post('/signup',Validations.validateSignup, User.create);
router.post('/signin', Validations.validateLogin, User.userlogin);


export default router;