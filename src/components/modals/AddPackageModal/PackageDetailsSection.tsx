import React from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";
import { useTranslation } from "../../../hooks/useTranslation";
interface Props {
  weight: string;
  dimensions: string;
  deliveryDate: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PackageDetailsSection({
  weight,
  dimensions,
  deliveryDate,
  onInputChange,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="weight">{t("AddPackage.Weight")}</Label>
        <Input
          type="number"
          id="weight"
          name="weight"
          value={weight}
          onChange={onInputChange}
          placeholder="0.5"
          step={0.1}
        />
      </div>
      <div>
      <Label htmlFor="dimensions">{t("AddPackage.Dimensions")}</Label>
        <Input
          type="text"
          id="dimensions"
          name="dimensions"
          value={dimensions}
          onChange={onInputChange}
          placeholder="10×10×5 cm"
        />
      </div>
      <div>
        <Label htmlFor="deliveryDate">{t("AddPackage.DeliveryDate")}</Label>
        <Input
          type="date"
          id="deliveryDate"
          name="deliveryDate"
          value={deliveryDate}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
}
