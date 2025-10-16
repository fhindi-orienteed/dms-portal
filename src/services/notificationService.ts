import { NotificationResponse } from "../models/notificationModel";
import { apiUtils } from "../utils/apiUtils";

export const notificationService = {
  async getNotifications(): Promise<NotificationResponse> {
    const token = apiUtils.auth.getToken(); 
    if (!token) {
      throw new Error("User is not authenticated");
    }

    const response = await fetch("http://api-dms.orienteed.ps/v1/web/notification/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    return response.json();
  },
};
