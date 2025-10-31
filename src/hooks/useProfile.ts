import { useState, useEffect } from 'react';
import { profileService } from '../services/ProfileService';
import UserProfile from '../models/UerProfile';

const PROFILE_KEY = 'userProfile';

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>();

  const loadProfile = async () => {
    try {
      const userData = await profileService.getProfile();
      if (userData) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(userData));
        setProfile(userData);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
    }
  };

  const getProfile = (): UserProfile | null => {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? new UserProfile(JSON.parse(data)) : null;
  };

  useEffect(() => {
    const cached = getProfile();
    if (cached) {
      setProfile(cached);
    } else {
      void loadProfile();
    }
  }, []);

  return { profile };
}
