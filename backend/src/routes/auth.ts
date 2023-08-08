import AuthController from "../controllers/AuthController";
import express from "express";
const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signup);

export default router;
