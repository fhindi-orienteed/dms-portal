// src/services/profileService.ts
import api from '../config/api';
import endpoints from '../config/endpoint';
import UserProfile from '../models/UerProfile';

async function getProfile(): Promise<UserProfile | null> {
  const response = await api.get(endpoints.user.profile);

  if (response.data) {
    return new UserProfile(response.data);
  }
  return null;
}

export const profileService = { getProfile };
