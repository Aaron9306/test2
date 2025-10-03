import { apiClient } from "../utils/api";

export type Observation = {
  aqi: number;
  pm25?: number;
  no2?: number;
  ozone?: number;
  lat: number;
  lng: number;
  timestamp: string;
  weather?: any;
};

export async function getNearby(lat: number, lng: number, radiusKm = 5) {
  const res = await apiClient.get(`/data/nearby?lat=${lat}&lng=${lng}&radiusKm=${radiusKm}`);
  return res.data as { observations: Observation[] };
}

export async function getHistory(lat: number, lng: number, from: string, to: string) {
  const res = await apiClient.get(`/data/history?lat=${lat}&lng=${lng}&from=${from}&to=${to}`);
  return res.data as { observations: Observation[] };
}