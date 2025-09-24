import { useState } from "react";
import { useTranslation } from "react-i18next";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import ComponentCard from "../components/common/ComponentCard";
import Button from "../components/ui/button/Button";
import { SearchIcon, CheckLineIcon, TrashBinIcon } from "../icons";

const mockNotifications = [
  {
    id: 1,
    user: {
      name: "Terry Franci",
      avatar: "/images/user/user-02.jpg",
      status: "online"
    },
    message: "requests permission to change",
    project: "Project - Nganter App",
    type: "Project",
    time: "5 min ago",
    isRead: false,
    priority: "high"
  },
  {
    id: 2,
    user: {
      name: "Alena Franci",
      avatar: "/images/user/user-03.jpg",
      status: "online"
    },
    message: "requests permission to change",
    project: "Project - Nganter App",
    type: "Project",
    time: "8 min ago",
    isRead: false,
    priority: "medium"
  },
  {
    id: 3,
    user: {
      name: "Jocelyn Kenter",
      avatar: "/images/user/user-04.jpg",
      status: "online"
    },
    message: "requests permission to change",
    project: "Project - Nganter App",
    type: "Project",
    time: "15 min ago",
    isRead: true,
    priority: "low"
  },
  {
    id: 4,
    user: {
      name: "Brandon Philips",
      avatar: "/images/user/user-05.jpg",
      status: "offline"
    },
    message: "requests permission to change",
    project: "Project - Nganter App",
    type: "Project",
    time: "1 hr ago",
    isRead: true,
    priority: "high"
  },
  {
    id: 5,
    user: {
      name: "Sarah Wilson",
      avatar: "/images/user/user-06.jpg",
      status: "online"
    },
    message: "completed the task",
    project: "Project - Dashboard Update",
    type: "Task",
    time: "2 hr ago",
    isRead: false,
    priority: "medium"
  },
  {
    id: 6,
    user: {
      name: "Mike Johnson",
      avatar: "/images/user/user-07.jpg",
      status: "online"
    },
    message: "commented on",
    project: "Project - Mobile App",
    type: "Comment",
    time: "3 hr ago",
    isRead: true,
    priority: "low"
  },
  {
    id: 7,
    user: {
      name: "Emily Davis",
      avatar: "/images/user/user-08.jpg",
      status: "offline"
    },
    message: "uploaded new files to",
    project: "Project - Design System",
    type: "File",
    time: "5 hr ago",
    isRead: false,
    priority: "medium"
  },
  {
    id: 8,
    user: {
      name: "David Brown",
      avatar: "/images/user/user-09.jpg",
      status: "online"
    },
    message: "assigned you to",
    project: "Project - Bug Fixes",
    type: "Assignment",
    time: "1 day ago",
    isRead: true,
    priority: "high"
  }
];

interface NotificationItemProps {
  notification: typeof mockNotifications[0];
  onMarkAsRead: (id: number) => void;
  onDelete: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-success-500";
      case "offline":
        return "bg-error-500";
      default:
        return "bg-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
    <div className={`flex gap-4 p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${!notification.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
      {/* User Avatar */}
      <div className="relative flex-shrink-0">
        <img
          width={48}
          height={48}
          src={notification.user.avatar}
          alt={notification.user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(notification.user.status)}`}></span>
      </div>

      {/* Notification Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-800 dark:text-white/90">
              <span className="font-medium">{notification.user.name}</span>{" "}
              <span className="text-gray-600 dark:text-gray-400">{notification.message}</span>{" "}
              <span className="font-medium text-blue-600 dark:text-blue-400">{notification.project}</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                {notification.type}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
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
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDeleteAll = () => {
    setNotifications([]);
  };

  // Filter notifications based on search and filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || notification.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "unread" && !notification.isRead) ||
                         (filterStatus === "read" && notification.isRead);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6">
      <PageBreadcrumb pageTitle={t("notifications.allNotifications")} />
      
      {/* Header Actions */}
      <div className="mb-6">
        <ComponentCard title={t("notifications.allNotifications")} desc={`${notifications.length} total notifications, ${unreadCount} unread`}>
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
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="all">{t("notifications.allTypes")}</option>
                <option value="project">{t("notifications.project")}</option>
                <option value="task">{t("notifications.task")}</option>
                <option value="comment">{t("notifications.comment")}</option>
                <option value="file">{t("notifications.file")}</option>
                <option value="assignment">{t("notifications.assignment")}</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="all">{t("notifications.allStatus")}</option>
                <option value="unread">{t("notifications.unread")}</option>
                <option value="read">{t("notifications.read")}</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                {t("notifications.markAllRead")}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDeleteAll}
                disabled={notifications.length === 0}
              >
                {t("notifications.deleteAll")}
              </Button>
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Notifications List */}
      <ComponentCard title={t("notifications.notificationsList")} desc={`${filteredNotifications.length} notifications found`}>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("notifications.noNotifications")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm || filterType !== "all" || filterStatus !== "all" 
                ? t("notifications.noNotificationsFiltered")
                : t("notifications.noNotificationsDesc")
              }
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
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
