import { Router } from "express";
import {
  getDevices,
  createDevice,
  ingestTelemetryWebhook,
  getDeviceTelemetry
} from "../controllers/devices.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", getDevices);
router.post("/", createDevice);

// Public secured webhook (no auth)
router.post(
  "/:deviceId/telemetry",
  express.json(), // ensure raw JSON for HMAC
  ingestTelemetryWebhook
);

router.get("/:deviceId/telemetry", getDeviceTelemetry);

export default router;