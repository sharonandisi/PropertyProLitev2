import express from "express";
import UserwithDb from "../controllers/user";
import Validations from "../middleware/userValidations";


const router = express.Router();


router.post('/signup', Validations.validateSignup, UserwithDb.create);
router.post('/signin', Validations.validateLogin, UserwithDb.login);


export default router;