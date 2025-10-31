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
    firstName: "",
    lastName: "",
    birthDay: "",
    mobile: "",
    email: "",
    address: "",
    identifierNumber: "",
    employeeNumber: "",
    role: "Admin",
    branch: "",
  });

  const handleSubmit = () => {
    if (!formData.firstName || !formData.email) {
      showToast.error(t("merchants.users.fillAllFields"));
      return;
    }
    onAdd(formData);
    showToast.success(t("merchants.users.userAddedSuccess"));
    setFormData({
      firstName: "",
      role: "User",
      email: "",
      lastName: "",
      birthDay: "",
      mobile: "",
      address: "",
      identifierNumber: "",
      employeeNumber: "",
      branch: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          {t("merchants.users.addNewUser")}
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("merchants.users.firstName")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterFirstName")}
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>{t("merchants.users.lastName")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterLastName")}
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("merchants.users.birthDay")}</Label>
              <Input
                type="date"
                value={formData.birthDay}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, birthDay: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>{t("merchants.users.mobile")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterMobile")}
                value={formData.mobile}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mobile: e.target.value }))
                }
              />
            </div>
          </div>
          <div>
            <Label>{t("merchants.users.email")} *</Label>
            <Input
              type="email"
              placeholder={t("merchants.users.enterEmailAddress")}
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div>
            <Label>{t("merchants.users.address")}</Label>
            <Input
              type="text"
              placeholder={t("merchants.users.enterAddress")}
              value={formData.address}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t("merchants.users.identifierNumber")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterIdentifierNumber")}
                value={formData.identifierNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    identifierNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>{t("merchants.users.employeeNumber")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterEmployeeNumber")}
                value={formData.employeeNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    employeeNumber: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              {" "}
              <Label>{t("merchants.users.role")}</Label>{" "}
              <Select
                options={[
                  { value: "Admin", label: t("merchants.users.roles.admin") },
                  { value: "Employee", label: t("merchants.users.roles.employee") },
                  {
                    value: "Manager",
                    label: t("merchants.users.roles.manager"),
                  },
                ]}
                defaultValue={formData.role}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, role: value }))
                }
              />{" "}
            </div>
            <div>
              <Label>{t("merchants.users.branch")} *</Label>
              <Input
                type="text"
                placeholder={t("merchants.users.enterBranch")}
                value={formData.branch}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, branch: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            {t("merchants.users.addUser")}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
