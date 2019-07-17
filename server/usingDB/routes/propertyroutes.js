import express from "express";
import Property from "../controllers/Property";




const router = express.Router();


router.post('/property', Property.create);


export default router;