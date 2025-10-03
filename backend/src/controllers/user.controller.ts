import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMe(req: Request, res: Response) {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ error: "Not found" });
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    locationLat: user.locationLat,
    locationLng: user.locationLng,
    healthInfo: user.healthInfo
  });
}

export async function updateMe(req: Request, res: Response) {
  const { locationLat, locationLng, healthInfo } = req.body;
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: {
      locationLat,
      locationLng,
      healthInfo: healthInfo ? JSON.stringify(healthInfo) : undefined
    }
  });
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    locationLat: user.locationLat,
    locationLng: user.locationLng,
    healthInfo: user.healthInfo
  });
}