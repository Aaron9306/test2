import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { fetchTempo } from "../services/tempo.service";
import { fetchOpenAQ } from "../services/openaq.service";
import { fetchWeather } from "../services/openweather.service";

const prisma = new PrismaClient();

export async function getNearby(req: Request, res: Response) {
  const { lat, lng, radiusKm = 5, hours = 3 } = req.query;
  const latNum = Number(lat), lngNum = Number(lng), radius = Number(radiusKm);

  // Fetch device, OpenAQ, TEMPO, weather data in parallel
  const [deviceObs, openaq, tempo, weather] = await Promise.all([
    prisma.telemetry.findMany({
      where: {
        recordedAt: { gte: new Date(Date.now() - hours * 3600 * 1000) },
        device: { ownerId: req.user.id }
      },
      orderBy: { recordedAt: "desc" },
      take: 10
    }),
    fetchOpenAQ(latNum, lngNum, radius),
    fetchTempo(latNum, lngNum),
    fetchWeather(latNum, lngNum)
  ]);

  // Merge results, prefer device > OpenAQ > TEMPO
  const latest = deviceObs[0]
    ? {
        source: "DEVICE",
        ...deviceObs[0].payload,
        timestamp: deviceObs[0].recordedAt
      }
    : openaq.results?.[0]
    ? {
        source: "OPENAQ",
        ...openaq.results[0],
        timestamp: openaq.results[0].date.utc
      }
    : {
        source: "TEMPO",
        ...tempo,
        timestamp: new Date().toISOString()
      };

  res.json({
    observations: [
      {
        aqi: latest.aqi ?? null,
        pm25: latest.pm25 ?? null,
        no2: latest.no2 ?? null,
        ozone: latest.ozone ?? null,
        lat: latNum,
        lng: lngNum,
        timestamp: latest.timestamp,
        weather
      }
    ]
  });
}

export async function getHistory(req: Request, res: Response) {
  const { lat, lng, from, to } = req.query;
  const latNum = Number(lat), lngNum = Number(lng);

  const obs = await prisma.airObservation.findMany({
    where: {
      lat: { gte: latNum - 0.1, lte: latNum + 0.1 },
      lng: { gte: lngNum - 0.1, lte: lngNum + 0.1 },
      timestamp: {
        gte: new Date(from as string),
        lte: new Date(to as string)
      }
    },
    orderBy: { timestamp: "asc" }
  });

  res.json({
    observations: obs.map(o => ({
      aqi: o.aqi,
      pm25: o.pm25,
      no2: o.no2,
      ozone: o.ozone,
      lat: o.lat,
      lng: o.lng,
      timestamp: o.timestamp
    }))
  });
}