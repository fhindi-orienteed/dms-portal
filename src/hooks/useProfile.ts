import { useState, useEffect } from "react";
import api from "../config/api";
import { apiUtils } from "../utils/apiUtils";

export interface UserProfile {
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  mobile: string;
  address: string;
  photo?: string;
companyDetails?: string;
driverDetails?: string;
}

const PROFILE_KEY = "userProfile";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const loadProfile = async () => {
    try {
      const response = await api.get("/users/profile");

       console.log(" Profile Response:", response.data);
      const userData: UserProfile = response.data;

      localStorage.setItem(PROFILE_KEY, JSON.stringify(userData));

      setProfile(userData);
    } catch (error) {
      console.error(" Failed to load profile:", error);
    }
  };

  const getProfile = (): UserProfile | null => {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const stored = getProfile();
    if (stored) {
      setProfile(stored);
    } else {
      loadProfile();
    }
  }, []);

  return { profile, loadProfile, getProfile };
}
