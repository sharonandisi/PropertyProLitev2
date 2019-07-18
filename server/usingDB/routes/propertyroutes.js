import express from "express";
import Property from "../controllers/Property";
import auth from "../middleware/authen";
import Validation from "../middleware/propertyValidation";




const router = express.Router();


router.post('/property', Validation.validatePostproperty, auth.verifyToken ,Property.create);
router.get('/properties', Property.getAll);
router.get('/properties/:id',  Property.getOne);
router.patch('/property/:id', Property.update);
router.get('/property', Property.getType);
router.delete('/property/:id', Property.delete);

export default router;