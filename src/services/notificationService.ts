import { NotificationResponse } from "../models/notificationModel";
import { apiUtils } from "../utils/apiUtils";
import api from "../config/api";

export const notificationService = {
  async getNotifications(): Promise<NotificationResponse> {
    const token = apiUtils.auth.getToken();
    if (!token) {
      throw new Error("User is not authenticated");
    }

    try {
      const response = await api.get("notification/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notifications");
    }
  },
};

