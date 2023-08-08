import { EducationController } from "../controllers/EducationController";
import express from "express";
const router = express.Router();

router.get("/educations", EducationController.index);
router.get("/educations/:id", EducationController.show);
router.post("/educations", EducationController.store);
router.put("/educations/:id", EducationController.update);
router.delete("/educations/:id", EducationController.delete);

export default router;
