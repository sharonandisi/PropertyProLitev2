import express from "express";
import user from "./userRoutes";
import property from "./propertyroutes";






const router = express.Router();


router.use('/api/v1/auth', user);
router.use('/api/v1', property);

export default router;