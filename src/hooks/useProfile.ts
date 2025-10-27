import { useState, useEffect } from "react";
import { profileService, type UserProfile } from "../services/ProfileService";

const PROFILE_KEY = "userProfile";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loadProfile = async () => {
    try {
      const userData = await profileService.getProfile();
      localStorage.setItem(PROFILE_KEY, JSON.stringify(userData));
      setProfile(userData);
    } catch (error) {
      console.error("Failed to load profile:", error);
    }
  };

  const getProfile = (): UserProfile | null => {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? (JSON.parse(data) as UserProfile) : null;
  };

  useEffect(() => {
    const cached = getProfile();
    if (cached) {
      setProfile(cached);
    } else {
      void loadProfile();
    }
  }, []);

  return { profile, loadProfile, getProfile };
}
