import { SchoolController } from "../controllers/SchoolController";
import express from "express";
const router = express.Router();

router.get("/schools", SchoolController.index);
router.get("/schools/:id", SchoolController.show);
router.post("/schools", SchoolController.store);
router.put("/schools/:id", SchoolController.update);
router.delete("/schools/:id", SchoolController.delete);

export default router;
