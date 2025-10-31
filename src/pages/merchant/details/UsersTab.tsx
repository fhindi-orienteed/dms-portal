import { useState } from "react";
import { useTranslation } from "react-i18next";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Button from "../../../components/ui/button/Button";
import Badge from "../../../components/ui/badge/Badge";
import { PlusIcon, UserCircleIcon } from "../../../icons";
import AddUserModal from "./AddUserModal";
import { getTranslatedRole, getTranslatedUserStatus } from "../../../utils/packageUtils";

interface UsersTabProps {
  users: any[];
  onAddUser: (user: any) => void;
}

export default function UsersTab({ users, onAddUser }: UsersTabProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: t("merchants.users.name"),
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
      header: t("merchants.users.role"),
      accessor: (user: any) => (
        <Badge color={user.role === "Admin" ? "primary" : "success"}>
          {getTranslatedRole(user.role, t)}
        </Badge>
      )
    },
    {
      header: t("merchants.users.email"),
      accessor: (user: any) => (
        <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
      )
    },
    {
      header: t("merchants.users.status"),
      accessor: (user: any) => (
        <Badge color={user.status === "Active" ? "success" : "error"}>
          {getTranslatedUserStatus(user.status, t)}
        </Badge>
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
          {t("merchants.users.addUser")}
        </Button>
      </div>
      <GenericDataTable
        data={users}
        columns={columns}
        itemsPerPage={10}
        showPagination={true}
        emptyMessage={t('merchants.users.noUsers')}
      />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
}

