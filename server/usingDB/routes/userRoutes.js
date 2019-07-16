import express from "express";
import UserwithDb from "../controllers/user";



const router = express.Router();


router.post('/api/v1/user', UserwithDb.create);


export default router;