import { TimeIcon, UserCircleIcon } from "../../../icons";
import { CustomerFollowUp } from "./mockData";

interface FollowUpStatsProps {
  followUps: CustomerFollowUp[];
}

export default function FollowUpStats({ followUps }: FollowUpStatsProps) {
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && 
           followUps.find(f => f.dueDate === dueDate)?.status !== 'resolved' &&
           followUps.find(f => f.dueDate === dueDate)?.status !== 'closed';
  };

  const pendingCount = followUps.filter(f => f.status === 'pending').length;
  const overdueCount = followUps.filter(f => isOverdue(f.dueDate)).length;
  const urgentCount = followUps.filter(f => f.priority === 'urgent').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <TimeIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <TimeIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overdue</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{overdueCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <UserCircleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Urgent</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{urgentCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
