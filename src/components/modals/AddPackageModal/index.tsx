import React, { useState } from "react";
import { Modal } from "../../ui/modal";
import Button from "../../ui/button/Button";
import TextArea from "../../form/input/TextArea";
import Label from "../../form/Label";
import TrackingNumberField from "./TrackingNumberField";
import RecipientAddressField from "./RecipientAddressField";
import SenderSection from "./SenderSection";
import PackageDetailsSection from "./PackageDetailsSection";
import SenderDetailsSection from "./SenderDetailsSection";
import RecipientSection from "./RecipientSection";
import PaymentSection from "./PaymentSection";
import ServiceOrderSection from "./ServiceOrderSection";
import PackagePropertiesSection from "./PackagePropertiesSection";
import { useTranslation } from "../../../hooks/useTranslation";
interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddPackageModal({
  isOpen,
  onClose,
}: AddPackageModalProps) {
  const [formData, setFormData] = useState({
    trackingNumber: "",
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    senderName: "",
    senderAddress: "",
    packageType: "",
    weight: "",
    dimensions: "",
    specialInstructions: "",
    deliveryDate: "",
    priority: "standard",
    commercialName: "",
    branchAddress: "",
    shipmentType: "",
    codAmount: "",
    collectionMethod: "",
    serviceType: "",
    invoiceNumber: "",
    expectedDeliveryDate: "",
    expectedPickupDate: "",
    fragile: false,
    needsPackaging: false,
    recipientFingerprint: false,
    flammable: false,
    destructible: false,
    preventOpening: false,
    preventMeasuring: false,
    recipientSecondPhone: "",
  
  });
  const [properties, setProperties] = useState({
    fragile: false,
    flammable: false,
    destructible: false,
    preventOpening: false,
    preventMeasuring: false,
  });
  const handlePropertyChange = (name: string, value: boolean) => {
    setProperties((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleTextAreaChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Package data:", formData);
    onClose();
  };
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="flex flex-col h-[100vh]">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {t("AddPackage.Add-new-package")}
           
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
          {t("AddPackage.Description")}
          
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tracking Number */}
            <TrackingNumberField
              value={formData.trackingNumber}
              onChange={handleInputChange}
            />
            <SenderDetailsSection
              commercialName={formData.commercialName}
              branchAddress={formData.branchAddress}
              branchOptions={[
                { value: "branch_1", label: "123 Main St, City" },
                { value: "branch_2", label: "456 Oak Ave, City" },
              ]}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            {/* Recipient Informati*/}
            <RecipientSection
              recipientName={formData.recipientName}
              recipientPhone={formData.recipientPhone}
              recipientSecondPhone={formData.recipientSecondPhone}
              priority={formData.priority}
              priorityOptions={[
                { value: "standard", label: t("AddPackage.standard") },
                { value: "express", label: t("AddPackage.express") },
                { value: "overnight", label: t("AddPackage.overnight") },
              ]}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            {/* Recipient Address */}
            <RecipientAddressField
              value={formData.recipientAddress}
              onChange={handleTextAreaChange("recipientAddress")}
            />
            {/*PaymentSection*/}
            <PaymentSection
              shipmentType={formData.shipmentType}
              codAmount={formData.codAmount}
              collectionMethod={formData.collectionMethod}
              shipmentOptions={[
                { value: "standard", label: t("AddPackage.standard") },
                { value: "express", label: t("AddPackage.express") },
                { value: "overnight", label: t("AddPackage.overnight") },
              ]}
              collectionOptions={[
                { value: "cash", label: t("AddPackage.cash") },
                { value: "digital_wallet", label: t("AddPackage.digitalWallet") },
                { value: "cheque", label: t("AddPackage.cheque") },
                { value: "bank_transfer", label: t("AddPackage.bankTransfer") },
                { value: "paymen_card", label: t("AddPackage.paymentCard") },
                { value: "cod", label: t("AddPackage.cod") },
              ]}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            <ServiceOrderSection
              serviceType={formData.serviceType}
              invoiceNumber={formData.invoiceNumber}
              expectedDeliveryDate={formData.expectedDeliveryDate}
              expectedPickupDate={formData.expectedPickupDate}
              serviceOptions={[
                { value: "standard", label: t("AddPackage.standard") },
                { value: "express", label: t("AddPackage.express") },
                { value: "overnight", label: t("AddPackage.overnight") },
              ]}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />{" "}
            {/* Sender Information */}
            <SenderSection
              senderName={formData.senderName}
              packageType={formData.packageType}
              packageTypeOptions={[
                { value: "document", label: t("AddPackage.document") },
                { value: "package", label: t("AddPackage.package") },
                { value: "fragile", label: t("AddPackage.fragile") },
                { value: "electronics", label: t("AddPackage.electronics") },
              ]}
              onInputChange={handleInputChange}
              onSelectChange={handleSelectChange}
            />
            {/* Package Details */}
            <PackageDetailsSection
              weight={formData.weight}
              dimensions={formData.dimensions}
              deliveryDate={formData.deliveryDate}
              onInputChange={handleInputChange}
            />
            <PackagePropertiesSection
              properties={properties}
              setProperties={handlePropertyChange}
            />
            {/* Special Instructions */}
            <div>
              <Label htmlFor="specialInstructions">{t("AddPackage.SpecialInstructions")}</Label>
              <TextArea
                placeholder={t("AddPackage.specialInstructionsPlaceholder")}
                rows={3}
                value={formData.specialInstructions}
                onChange={handleTextAreaChange("specialInstructions")}
              />
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button type="button" variant="secondary" onClick={onClose}>
                
              {t("AddPackage.Cancel")}
              </Button>
              <Button type="submit" variant="primary">
              {t("AddPackage.CreatePackage")} 
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
