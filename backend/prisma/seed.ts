import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("testpassword", 10);
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      passwordHash,
      role: "teacher",
      locationLat: 32.7767,
      locationLng: -96.7970
    }
  });

  const device = await prisma.device.upsert({
    where: { id: "test-device-id" },
    update: {},
    create: {
      id: "test-device-id",
      name: "Test Device",
      ownerId: user.id,
      meta: { secret: "testsecret" }
    }
  });

  await prisma.telemetry.create({
    data: {
      deviceId: device.id,
      recordedAt: new Date(),
      payload: {
        deviceId: device.id,
        timestamp: new Date().toISOString(),
        lat: 32.7767,
        lng: -96.7970,
        pm25: 25.1,
        no2: 12.5,
        ozone: 0.031,
        temp: 24.2,
        humidity: 35
      }
    }
  });

  console.log("Seeded test user, device, and telemetry.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(() => prisma.$disconnect());