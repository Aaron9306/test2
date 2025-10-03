import { Router } from "express";
import { getNearby, getHistory } from "../controllers/data.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/nearby", getNearby);
router.get("/history", getHistory);

export default router;