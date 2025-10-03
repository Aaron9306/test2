import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

function signToken(user: { id: string; role: string }) {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
}

export async function signup(req: Request, res: Response) {
  const { email, password, role, location, healthInfo } = req.body;
  if (!email || !password || !role)
    return res.status(400).json({ error: "Missing fields" });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hash,
      role,
      locationLat: location?.lat ?? undefined,
      locationLng: location?.lng ?? undefined,
      healthInfo: healthInfo ? JSON.stringify(healthInfo) : undefined
    }
  });
  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ id: user.id, email: user.email, role: user.role });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = signToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
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

export async function logout(_: Request, res: Response) {
  res.clearCookie("token");
  res.json({ ok: true });
}