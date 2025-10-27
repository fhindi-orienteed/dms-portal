// src/services/profileService.ts
import api from "../config/api";

export interface UserProfile {
  email: string | null;
  role: string | null;
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  address: string | null;
  photo?: string | null;
  companyDetails?:  string | null;
  driverDetails?:  string | null;
}

const ENDPOINT = "/users/profile";

async function getProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>(ENDPOINT);
  return data;
}

export const profileService = { getProfile };
