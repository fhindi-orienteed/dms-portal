import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Label from "../../../components/form/Label";
import { showToast } from "../../../utils/toast";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    role: "User",
    email: "",
    status: "Active"
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      showToast.error(t("merchants.users.fillAllFields"));
      return;
    }
    onAdd(formData);
    showToast.success(t("merchants.users.userAddedSuccess"));
    setFormData({ name: "", role: "User", email: "", status: "Active" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t("merchants.users.addNewUser")}
        </h3>
        
        <div className="space-y-4">
          <div>
            <Label>{t('merchants.users.name')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.users.enterUserName')}
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.users.email')} *</Label>
            <Input
              type="email"
              placeholder={t('merchants.users.enterEmailAddress')}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.users.role')}</Label>
            <Select
              options={[
                { value: "Admin", label: t('merchants.users.roles.admin') },
                { value: "User", label: t('merchants.users.roles.user') },
                { value: "Manager", label: t('merchants.users.roles.manager') }
              ]}
              defaultValue={formData.role}
              onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.users.status')}</Label>
            <Select
              options={[
                { value: "Active", label: t('merchants.users.statuses.active') },
                { value: "Inactive", label: t('merchants.users.statuses.inactive') }
              ]}
              defaultValue={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {t('merchants.users.addUser')}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
