import { apiClient } from "../utils/api";

export type UserProfile = {
  id: string;
  email: string;
  role: string;
  locationLat?: number;
  locationLng?: number;
  healthInfo?: string;
};

export async function getMe(): Promise<UserProfile> {
  const res = await apiClient.get("/users/me");
  return res.data;
}

export async function updateMe(profile: Partial<UserProfile>) {
  const res = await apiClient.put("/users/me", profile);
  return res.data;
}