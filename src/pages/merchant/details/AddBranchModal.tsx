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
  branchName: "",
  branchCity: "",
  branchAddress: "",
  phone: "",
  mobile: "",
  email: ""
  });

  const handleSubmit = () => {
     if (!formData.branchName || !formData.branchCity || !formData.branchAddress || !formData.phone || !formData.mobile || !formData.email) {
      showToast.error(t("merchants.branches.fillAllFields"));
      return;
    }
    onAdd(formData);
    showToast.success(t("merchants.branches.branchAddedSuccess"));
    setFormData({branchName: "",branchCity: "",branchAddress: "",phone: "",mobile: "",email: ""});
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
              value={formData.branchName}
              onChange={(e) => setFormData(prev => ({ ...prev, branchName: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.branches.branchCity')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.branches.enterBranchCity')}
              value={formData.branchCity}
              onChange={(e) => setFormData(prev => ({ ...prev, branchCity: e.target.value }))}
            />
          </div>
          <div>
            <Label>{t('merchants.branches.branchAddress')} *</Label>
            <Input
              type="text"
              placeholder={t('merchants.branches.enterBranchAddress')}
              value={formData.branchAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, branchAddress: e.target.value }))}
            />
          </div>
 <div>
    <Label>{t('merchants.branches.phone')} *</Label>
    <Input
      type="text"
      placeholder={t('merchants.branches.enterPhone')}
      value={formData.phone}
      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
    />
  </div>

  <div>
    <Label>{t('merchants.branches.mobile')} *</Label>
    <Input
      type="text"
      placeholder={t('merchants.branches.enterMobile')}
      value={formData.mobile}
      onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
    />
  </div>

  <div>
    <Label>{t('merchants.branches.email')} *</Label>
    <Input
      type="email"
      placeholder={t('merchants.branches.enterEmail')}
      value={formData.email}
      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
