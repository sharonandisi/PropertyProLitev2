/* eslint-disable quotes */
import express from "express";
import Property from "../controllers/propertyController";
import Validation from "../middleware/propertyValidation";



const router = express.Router();


router.post('/property', Validation.validatePostproperty, Property.createPropertyAd);
router.get('/property/:id', Property.fetchSpecificProperty);
router.get('/properties',Property.fetchAllProperties);
router.patch('/property/:id/sold',Property.markPropertySold );
router.patch('/property/:id', Property.editPropertyAd );
router.get('/properties', Property.fetchSpecificProperty);
router.get('/property', Property.findAdsOfSpecificType);
router.delete('/property/:id', Property.deletePropertyAd);


export default router;