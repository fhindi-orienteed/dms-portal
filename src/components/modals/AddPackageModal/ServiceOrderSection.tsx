import React from 'react';
import Input from '../../form/input/InputField';
import Select from '../../form/Select';
import Label from '../../form/Label';
import { useTranslation } from "../../../hooks/useTranslation";
interface Option {
  value: string;
  label: string;
}

interface Props {
  serviceType: string;
  invoiceNumber: string;
  expectedDeliveryDate: string;
  expectedPickupDate: string;
  serviceOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function ServiceOrderSection({
  serviceType,
  invoiceNumber,
  expectedDeliveryDate,
  expectedPickupDate,
  serviceOptions,
  onInputChange,
  onSelectChange
}: Props) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      {/* Service Type */}
      <div>
        <Label htmlFor="serviceType">{t("AddPackage.ServiceType")}</Label>
        <Select
          options={serviceOptions}
          placeholder={t("AddPackage.Selectservicetype")}
          defaultValue={serviceType}
          onChange={onSelectChange('serviceType')}
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Invoice Number */}
      <div>
        <Label htmlFor="invoiceNumber">{t("AddPackage.InvoiceNumber")}</Label>
        <Input
          type="text"
          id="invoiceNumber"
          name="invoiceNumber"
          value={invoiceNumber}
          onChange={onInputChange}
          placeholder={t("AddPackage.Enterinvoicenumber")}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Expected Delivery Date */}
      <div>
        <Label htmlFor="expectedDeliveryDate">{t("AddPackage.ExpectedDeliveryDate")}</Label>
        <Input
          type="date"
          id="expectedDeliveryDate"
          name="expectedDeliveryDate"
          value={expectedDeliveryDate}
          onChange={onInputChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Expected Pickup Date */}
      <div>
        <Label htmlFor="expectedPickupDate">{t("AddPackage.ExpectedPickupDate")}</Label>
        <Input
          type="date"
          id="expectedPickupDate"
          name="expectedPickupDate"
          value={expectedPickupDate}
          onChange={onInputChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}