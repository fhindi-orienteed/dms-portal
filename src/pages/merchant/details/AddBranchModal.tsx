import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { showToast } from "../../../utils/toast";

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (branch: any) => void;
}

export default function AddBranchModal({ isOpen, onClose, onAdd }: AddBranchModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    manager: ""
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.manager) {
      showToast.error(t("merchants.branches.fillAllFields"));
      return;
    }
    onAdd(formData);
    showToast.success(t("merchants.branches.branchAddedSuccess"));
    setFormData({ name: "", address: "", manager: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t("merchants.branches.addNewBranch")}
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label>{t('merchants.branches.branchName')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.branches.enterBranchName')}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.branches.address')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.branches.enterBranchAddress')}
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.branches.manager')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.branches.enterManagerName')}
              value={formData.manager}
              onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {t('merchants.branches.addBranch')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
