import { NotificationResponse } from "../models/notificationModel";
import api from "../config/api";

export const notificationService = {
  async getNotifications(): Promise<NotificationResponse> {
    try {
      const response = await api.get("notification/list");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch notifications");
    }
  },
};

