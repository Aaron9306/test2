import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { fetchTempo } from "../services/tempo.service";
import { fetchOpenAQ } from "../services/openaq.service";
import { fetchWeather } from "../services/openweather.service";

// Fetch and store merged observations for all users periodically

const prisma = new PrismaClient();

cron.schedule("*/15 * * * *", async () => {
  console.log("Running air quality aggregation...");
  const users = await prisma.user.findMany({
    where: { locationLat: { not: null }, locationLng: { not: null } }
  });
  for (const user of users) {
    const lat = user.locationLat!;
    const lng = user.locationLng!;
    try {
      const [tempo, openaq, weather] = await Promise.all([
        fetchTempo(lat, lng),
        fetchOpenAQ(lat, lng, 10),
        fetchWeather(lat, lng)
      ]);
      await prisma.airObservation.create({
        data: {
          source: "MERGED",
          lat,
          lng,
          timestamp: new Date(),
          aqi: tempo.aqi,
          pm25: tempo.pm25,
          no2: tempo.no2,
          ozone: tempo.ozone,
          payload: { tempo, openaq, weather }
        }
      });
    } catch (err) {
      console.error("Aggregation error:", err);
    }
  }
});