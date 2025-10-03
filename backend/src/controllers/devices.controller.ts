import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyHmac } from "../utils/hmac";

const prisma = new PrismaClient();

export async function getDevices(req: Request, res: Response) {
  const devices = await prisma.device.findMany({ where: { ownerId: req.user.id } });
  res.json(devices);
}

export async function createDevice(req: Request, res: Response) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing device name" });
  // Generate random secret for device webhook
  const secret = require("crypto").randomBytes(32).toString("hex");
  const device = await prisma.device.create({
    data: { name, ownerId: req.user.id, meta: { secret } }
  });
  res.status(201).json({ ...device, deviceSecret: secret });
}

export async function ingestTelemetryWebhook(req: Request, res: Response) {
  const { deviceId } = req.params;
  const signature = req.header("X-SIGNATURE");
  if (!signature) return res.status(400).json({ error: "Missing signature" });

  const device = await prisma.device.findUnique({ where: { id: deviceId } });
  if (!device) return res.status(404).json({ error: "Device not found" });

  const deviceSecret = (device.meta as any)?.secret;
  if (!verifyHmac(req.body, deviceSecret, signature)) {
    return res.status(401).json({ error: "invalid signature" });
  }

  await prisma.telemetry.create({
    data: {
      deviceId,
      recordedAt: new Date(req.body.timestamp),
      payload: req.body
    }
  });

  res.status(201).json({ ok: true });
}

export async function getDeviceTelemetry(req: Request, res: Response) {
  const { deviceId } = req.params;
  const { limit = 100 } = req.query;
  const telemetry = await prisma.telemetry.findMany({
    where: { deviceId },
    orderBy: { recordedAt: "desc" },
    take: Number(limit)
  });
  res.json(telemetry);
}