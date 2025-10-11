import { useState } from "react";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";
import { PlusIcon, UserCircleIcon } from "../../../icons";
import AddUserModal from "./AddUserModal";

interface UsersTabProps {
  users: any[];
  onAddUser: (user: any) => void;
}

export default function UsersTab({ users, onAddUser }: UsersTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: "Name",
      accessor: (user: any) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
            <UserCircleIcon className="size-4 text-blue-600 dark:text-blue-400" />
          </div>
          <span className="font-medium text-gray-800 dark:text-white/90">{user.name}</span>
        </div>
      )
    },
    {
      header: "Role",
      accessor: (user: any) => (
        <Badge color={user.role === "Admin" ? "primary" : "success"}>{user.role}</Badge>
      )
    },
    {
      header: "Email",
      accessor: (user: any) => (
        <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
      )
    },
    {
      header: "Status",
      accessor: (user: any) => (
        <Badge color={user.status === "Active" ? "success" : "error"}>{user.status}</Badge>
      )
    }
  ];

  const handleAdd = (user: any) => {
    onAddUser(user);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          startIcon={<PlusIcon className="size-4 fill-white" />}
        >
          Add User
        </Button>
      </div>
      <GenericDataTable
        data={users}
        columns={columns}
        itemsPerPage={10}
        showPagination={true}
        emptyMessage="No users found for this merchant."
      />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
}

