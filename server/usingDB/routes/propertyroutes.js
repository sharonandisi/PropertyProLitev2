import express from "express";
import Property from "../controllers/Property";
import auth from "../middleware/authen";
import Validation from "../middleware/propertyValidation";




const router = express.Router();


router.post('/property', Validation.validatePostproperty, auth.verifyToken, Property.create);
router.get('/properties', auth.verifyToken, Property.getAll);
router.get('/properties/:id', auth.verifyToken, Property.getOne);
router.patch('/property/:id', auth.verifyToken, Property.update);
router.get('/property', auth.verifyToken, Property.getType);
router.delete('/property/:id', auth.verifyToken, Property.delete);

export default router;