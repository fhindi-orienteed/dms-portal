import React from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { useTranslation } from "../../../hooks/useTranslation";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrackingNumberField({ value, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <Label htmlFor="trackingNumber">{t("AddPackage.Tracking-Number*")}</Label>
      <Input
        type="text"
        id="trackingNumber"
        name="trackingNumber"
        value={value}
        onChange={onChange}
        placeholder={t("AddPackage.enterTrackingNumber")}
      />
    </div>
  );
}
