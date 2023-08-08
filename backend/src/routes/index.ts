import authRoutes from "./auth";
import education from "./education";
import express from "express";
import school from "./school";
import { verifyToken } from "../middleware/auth";
const router = express.Router();

router.get("/", function (req, res, next) {
  res.send({ title: "Show Case" });
});

router.use("/api/v1", authRoutes);
router.use("/api/v1", verifyToken, school);
router.use("/api/v1", verifyToken, education);

export default router;
