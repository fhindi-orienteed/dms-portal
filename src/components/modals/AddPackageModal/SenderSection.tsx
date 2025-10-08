import React from "react";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Label from "../../form/Label";
import { useTranslation } from "../../../hooks/useTranslation";

interface Option {
  value: string;
  label: string;
}

interface Props {
  senderName: string;
  packageType: string;
  packageTypeOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function SenderSection({
  senderName,
  packageType,
  packageTypeOptions,
  onInputChange,
  onSelectChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="senderName">{t("AddPackage.SenderName")}</Label>
        <Input
          type="text"
          id="senderName"
          name="senderName"
          value={senderName}
          onChange={onInputChange}
          placeholder={t("AddPackage.SenderName")}
        />
      </div>
      <div>
        <Label htmlFor="packageType">{t("AddPackage.PackageType")}</Label>
        <Select
          options={packageTypeOptions}
          placeholder={t("AddPackage.Selecttype")}
          defaultValue={packageType}
          onChange={onSelectChange("packageType")}
        />
      </div>
    </div>
  );
}
