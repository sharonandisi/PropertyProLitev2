import express from "express";
import UserwithDb from "../controllers/user";

const router = express.Router();

router.post('/signup', UserwithDb.create);
router.post('/signin', UserwithDb.login);

export default router;