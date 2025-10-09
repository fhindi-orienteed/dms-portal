import React from "react";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Label from "../../form/Label";
import { useTranslation } from "../../../hooks/useTranslation";
import i18n from "../../../i18n";
interface Option {
  value: string;
  label: string;
}

interface Props {
  recipientName: string;
  recipientPhone: string;
  recipientSecondPhone: string;
  priority: string;
  priorityOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function RecipientSection({
  recipientName,
  recipientPhone,
  recipientSecondPhone,
  priority,
  priorityOptions,
  onInputChange,
  onSelectChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {/* Recipient Name & Mobile Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recipient Name */}
        <div>
          <Label htmlFor="recipientName">
            {t("AddPackage.RecipientName*")}
          </Label>
          <Input
            type="text"
            id="recipientName" 
            name="recipientName"
            value={recipientName}
            onChange={onInputChange}
            placeholder={t("AddPackage.Fullname")}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <Label htmlFor="recipientPhone">
            {t("AddPackage.MobileNumber*")}
          </Label>
          <Input
            type="tel"
            id="recipientPhone"
            name="recipientSecondPhone"
            value={recipientPhone}
            onChange={onInputChange}
            placeholder="+970 59 123 4567"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Second Mobile Number */}
      <div >
  <Label htmlFor="recipientSecondPhone">
    {t("AddPackage.SecondMobileNumber")}
  </Label>
  <Input
  type="tel"
  id="recipientSecondPhone"
  name="recipientSecondPhone"
  value={recipientSecondPhone}
  onChange={onInputChange}
  placeholder={t("AddPackage.secondPhonePlaceholder")}
  dir={i18n.language === "ar" ? "rtl" : "ltr"} 
/>
</div>

      {/* Priority */}
      <div>
        <Label htmlFor="priority">{t("AddPackage.Priority")}</Label>
        <Select
          options={priorityOptions}
          placeholder={t("AddPackage.priorityselect")}
          defaultValue={priority}
          onChange={onSelectChange("priority")}
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
