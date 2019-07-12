import express from "express";
import { createPropertyAd } from "../controllers/propertyController";
import { fetchSpecificProperty} from "../controllers/propertyController";
import { fetchAllProperties} from "../controllers/propertyController";
import Validation from "../middleware/propertyValidation";



const router = express.Router();

console.log(createPropertyAd);
router.post('/property', Validation.validatePostproperty, createPropertyAd );
router.get('/property/id', fetchSpecificProperty);
router.get('/property',fetchAllProperties);
router.patch('/property/')

export default router;