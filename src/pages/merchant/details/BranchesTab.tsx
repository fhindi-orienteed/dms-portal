import { useState } from "react";
import { useTranslation } from "react-i18next";
import GenericDataTable from "../../../components/tables/DataTables/GenericDataTable";
import Button from "../../../components/ui/button/Button";
import { PlusIcon } from "../../../icons";
import AddBranchModal from "./AddBranchModal";

interface BranchesTabProps {
  branches: any[];
  onAddBranch: (branch: any) => void;
}

export default function BranchesTab({ branches, onAddBranch }: BranchesTabProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: t("merchants.branches.branchName"),
      accessor: (branch: any) => (
        <span className="font-medium text-gray-800 dark:text-white/90">{branch.name}</span>
      )
    },
    {
      header: t("merchants.branches.address"),
      accessor: (branch: any) => (
        <span className="text-gray-600 dark:text-gray-400">{branch.address}</span>
      )
    },
    {
      header: t("merchants.branches.manager"),
      accessor: (branch: any) => (
        <span className="text-gray-800 dark:text-white/90">{branch.manager}</span>
      )
    }
  ];

  const handleAdd = (branch: any) => {
    onAddBranch(branch);
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
          {t("merchants.branches.addBranch")}
        </Button>
      </div>
      <GenericDataTable
        data={branches}
        columns={columns}
        itemsPerPage={10}
        showPagination={true}
        emptyMessage={t('merchants.branches.noBranches')}
      />
      <AddBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  );
}

