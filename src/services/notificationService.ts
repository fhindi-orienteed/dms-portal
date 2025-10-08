import { Notification } from "../models/notificationModel";
import notificationsData from "../data/notifications.json";

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return notificationsData;
  },
};
