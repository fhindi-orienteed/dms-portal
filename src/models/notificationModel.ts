export interface Notification {
  id: number;
  title: string;
  message: string; 
  type: string;
  entityId: number;
  entityType: string;
  priority: string;
  createdAt: string;
  expiresAt: string;
}

export interface NotificationResponse {
  content: Notification[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
