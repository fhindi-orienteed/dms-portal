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
  commercialName: string;
  branchAddress: string;
  branchOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function SenderDetailsSection({
  commercialName,
  branchAddress,
  branchOptions,
  onInputChange,
  onSelectChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="commercialName">{t("AddPackage.Commercial-Name")}</Label>
        <Input
          type="text"
          id="commercialName"
          name="commercialName"
          value={commercialName}
          onChange={onInputChange}
          placeholder={t("AddPackage.enterCommercialName")}
        />
      </div>
      <div>
        <Label htmlFor="branchAddress">{t("AddPackage.BranchAddress")}</Label>
        <Select
          options={branchOptions}
          placeholder={t("AddPackage.selectBranchAddress")}
          defaultValue={branchAddress}
          onChange={onSelectChange("branchAddress")}
        />
      </div>
    </div>
  );
}
