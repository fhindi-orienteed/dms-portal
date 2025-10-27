import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import Button from "../components/ui/button/Button";
import { SearchIcon, CheckLineIcon, TrashBinIcon } from "../icons";
import { GridIcon, UserCircleIcon, BoxIconLine, DollarLineIcon, PieChartIcon } from "../icons";
import Select from "../components/form/Select";
import { notificationService } from "../services/notificationService";
import { Notification } from "../models/notificationModel";

const getTypeIcon = (type: string) => {
  switch (type.toUpperCase()) {
    case "ACCOUNT":
      return <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />;
    case "PACKAGE":
      return <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />;
    case "SYSTEM":
      return <GridIcon className="text-gray-800 size-6 dark:text-white/90" />;
    case "COLLECTION":
      return <PieChartIcon className="text-gray-800 size-6 dark:text-white/90" />;
    case "PAYMENT":
      return <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />;
    default:
      return <UserCircleIcon className="text-gray-800 size-6 dark:text-white/90" />;
  }
};

interface NotificationItemProps {
  notification: Notification & { isRead?: boolean };
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onDelete }) => {
  const { t } = useTranslation();
  const translateText = (text: string) => t(`notifications.${text}`, { defaultValue: text });

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  return (
    <div
      className={`flex gap-4 p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
    >
      {/* Type Icon */}
      <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full dark:bg-gray-800">
        {getTypeIcon(notification.type)}
      </div>

      {/* Notification Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-800 dark:text-white/90">
              <span className="font-medium">{translateText(notification.title)}</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{translateText(notification.message)}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(notification.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 ml-4">
            {!notification.isRead && (
              <button
                onClick={() => onMarkAsRead(notification.id)}
                className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                title="Mark as read"
              >
                <CheckLineIcon className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => onDelete(notification.id)}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Delete notification"
            >
              <TrashBinIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AllNotifications() {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<(Notification & { isRead?: boolean })[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");


  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await notificationService.getNotifications();
        const notificationsWithIsRead = data.content.map((n: Notification) => ({
          ...n,
          isRead: false
        }));
        setNotifications(notificationsWithIsRead);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleDeleteAll = () => setNotifications([]);

  const typeOptions = [
    { value: "all", label: t("notifications.allTypes") || "All Types" },
    { value: "ACCOUNT", label: "Account" },
    { value: "PACKAGE", label: "Package" },
    { value: "SYSTEM", label: "System" },
    { value: "COLLECTION", label: "Collection" },
    { value: "PAYMENT", label: "Payment" },
  ];

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || n.type.toUpperCase() === filterType.toUpperCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle={t("notifications.allNotifications")} />

      {/* Header Actions */}
      <div className="mb-6">
        <ComponentCard
          title={t("notifications.allNotifications")}
           desc={`${notifications.length} ${t("notifications.allNotifications")}, ${unreadCount} ${t("notifications.unread")}`}>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3 flex-1">
              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("notifications.searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Type Filter */}
              <Select
                options={typeOptions}
                placeholder={t("notifications.allTypes") || "All Types"}
                onChange={(value) => setFilterType(value)}
                defaultValue={filterType}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="secondary" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                {t("notifications.markAllRead")}
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeleteAll} disabled={notifications.length === 0}>
                {t("notifications.deleteAll")}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Notifications List */}
      <ComponentCard title={t("notifications.notificationsList")} desc={`${filteredNotifications.length} notifications found`}>
        {filteredNotifications.length === 0 ? (
          <div className="text-center h-64 flex flex-col items-center justify-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("notifications.noNotifications")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {t("notifications.noNotificationsDesc")}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredNotifications.map(n => (
              <NotificationItem
                key={n.id}
                notification={n}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </ComponentCard>
    </div>
  );
}
