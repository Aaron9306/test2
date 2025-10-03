import { apiClient } from "../utils/api";

export type Device = {
  id: string;
  name: string;
  lastSeenAt?: string;
  meta?: any;
};

export type Telemetry = {
  id: string;
  deviceId: string;
  recordedAt: string;
  payload: any;
};

export async function getDevices(): Promise<Device[]> {
  const res = await apiClient.get("/devices");
  return res.data;
}

export async function createDevice(name: string): Promise<Device> {
  const res = await apiClient.post("/devices", { name });
  return res.data;
}

export async function getDeviceTelemetry(deviceId: string, limit = 100): Promise<Telemetry[]> {
  const res = await apiClient.get(`/devices/${deviceId}/telemetry?limit=${limit}`);
  return res.data;
}