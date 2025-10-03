export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  locationLat?: number;
  locationLng?: number;
  healthInfo?: string;
  createdAt: string;
  updatedAt: string;
};

export type Device = {
  id: string;
  name: string;
  ownerId: string;
  lastSeenAt?: string;
  meta?: any;
  createdAt: string;
};

export type Telemetry = {
  id: string;
  deviceId: string;
  recordedAt: string;
  payload: any;
  createdAt: string;
};

export type AirObservation = {
  id: string;
  source: string;
  lat: number;
  lng: number;
  timestamp: string;
  aqi?: number;
  pm25?: number;
  no2?: number;
  ozone?: number;
  payload: any;
  createdAt: string;
};