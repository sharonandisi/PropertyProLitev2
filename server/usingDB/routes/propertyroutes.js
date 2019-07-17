import express from "express";
import Property from "../controllers/Property";
import auth from "../middleware/authen";




const router = express.Router();


router.post('/property', Auth.verifyToken, Property.create);
router.get('/properties', Auth.verifyToken, Property.getAll);
router.get('/properties/:id', Auth.verifyToken, Property.getOne);
router.patch('/property/:id', Property.update);
router.get('/property', Property.getType);
router.delete('/property/:id', Property.delete);

export default router;