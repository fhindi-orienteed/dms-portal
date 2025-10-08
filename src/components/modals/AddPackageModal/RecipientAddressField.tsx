import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import { useTranslation } from "../../../hooks/useTranslation";
interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function RecipientAddressField({ value, onChange }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <Label htmlFor="recipientAddress">{t("AddPackage.RecipientAddress*")}</Label>
      <TextArea
       placeholder={t("AddPackage.addressPlaceholder")}
        rows={3}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
