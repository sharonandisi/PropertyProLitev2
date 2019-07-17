import express from "express";
import UserwithDb from "../controllers/user";



const router = express.Router();


router.post('/signup', UserwithDb.create);


export default router;