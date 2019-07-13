import express from "express";
import { createPropertyAd, markPropertySold, findAdsOfSpecificType, editPropertyAd, deletePropertyAd } from "../controllers/propertyController";
import { fetchSpecificProperty} from "../controllers/propertyController";
import { fetchAllProperties} from "../controllers/propertyController";
import Validation from "../middleware/propertyValidation";



const router = express.Router();

console.log(createPropertyAd);
router.post('/property', Validation.validatePostproperty, createPropertyAd );
router.get('/property/:id', fetchSpecificProperty);
router.get('/properties',fetchAllProperties);
router.patch('/property/:id/sold',markPropertySold );
router.get('/properties', fetchSpecificProperty);
router.get('/property', findAdsOfSpecificType);
router.patch('/property/:id',Validation.validateUpdateProperty, editPropertyAd);
router.delete('/property/:id', deletePropertyAd);


export default router;