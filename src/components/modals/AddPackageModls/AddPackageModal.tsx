import React, { useState } from 'react';
import { Modal } from '../../ui/modal';
import Button from '../../ui/button/Button';
import TextArea from '../../form/input/TextArea';
import Label from '../../form/Label';
import TrackingNumberField from './TrackingNumberField';
import RecipientAddressField from './RecipientAddressField';
import SenderSection from './SenderSection';
import PackageDetailsSection from './PackageDetailsSection';
import SenderDetailsSection from './SenderDetailsSection';
import RecipientSection from './RecipientSection';
import PaymentSection from './PaymentSection';
import ServiceOrderSection from './ServiceOrderSection';
import PackagePropertiesSection from './PackagePropertiesSection';
interface AddPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddPackageModal({ isOpen, onClose }: AddPackageModalProps) {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    senderName: '',
    senderAddress: '',
    packageType: '',
    weight: '',
    dimensions: '',
    specialInstructions: '',
    deliveryDate: '',
    priority: 'standard',
    commercialName: '',
    branchAddress: '',
    shipmentType: '',
    codAmount: '',
    collectionMethod: '',
    serviceType: '',
    invoiceNumber: '',
    expectedDeliveryDate: '',
    expectedPickupDate: '',
    fragile: false,
    needsPackaging: false,
    recipientFingerprint: false,
    flammable: false,
    destructible: false,
    preventOpening: false,
    preventMeasuring: false
  });
  const [properties, setProperties] = useState({
    fragile: false,
    flammable: false,
    destructible: false,
    preventOpening: false,
    preventMeasuring: false
  });
  const handlePropertyChange = (name: string, value: boolean) => {
    setProperties(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleTextAreaChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Package data:', formData);
    onClose();
  };
  const priorityOptions = [
    { value: 'standard', label: 'Standard' },
    { value: 'express', label: 'Express' },
    { value: 'overnight', label: 'Overnight' }
  ];
  const packageTypeOptions = [
    { value: 'document', label: 'Document' },
    { value: 'package', label: 'Package' },
    { value: 'fragile', label: 'Fragile' },
    { value: 'electronics', label: 'Electronics' }
  ];
  const branchOptions = [
    { value: 'branch_1', label: '123 Main St, City' },
    { value: 'branch_2', label: '456 Oak Ave, City' },
  ];
  const shipmentOptions = [
    { value: 'standard', label: 'Standard Shipping' },
    { value: 'express', label: 'Express Shipping' },
    { value: 'overnight', label: 'Overnight Shipping' },
  ];
  const collectionOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'digital_wallet', label: 'Digital Wallet' },
    { value: 'cheque', label: 'Cheque' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'paymen_card', label: 'Payment Card' },
    { value: 'cod', label: 'COD' },
  ];
  const serviceOptions = [
    { value: 'standard', label: 'Standard Service' },
    { value: 'express', label: 'Express Service' },
    { value: 'overnight', label: 'Overnight Service' },
  ];
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-6 overflow-y-auto max-h-[100vh]">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Add New Package
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Enter package details to create a new delivery order
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tracking Number */}
            <TrackingNumberField
            value={formData.trackingNumber}
            onChange={handleInputChange}
              />
            <SenderDetailsSection
        commercialName={formData.commercialName}
         branchAddress={formData.branchAddress}
        branchOptions={branchOptions}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
          />
          {/* Recipient Information */}
          <RecipientSection
            recipientName={formData.recipientName}
            recipientPhone={formData.recipientPhone}
            recipientSecondPhone={formData.recipientPhone}
            priority={formData.priority}
            priorityOptions={priorityOptions}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}/>
          {/* Recipient Address */}
          <RecipientAddressField
          value={formData.recipientAddress}
          onChange={handleTextAreaChange('recipientAddress')}
            />
            {/*PaymentSection*/}
            <PaymentSection
  shipmentType={formData.shipmentType}
  codAmount={formData.codAmount}
  collectionMethod={formData.collectionMethod}
  shipmentOptions={shipmentOptions}
  collectionOptions={collectionOptions}
  onInputChange={handleInputChange}
  onSelectChange={handleSelectChange}
/>
<ServiceOrderSection
  serviceType={formData.serviceType}
  invoiceNumber={formData.invoiceNumber}
  expectedDeliveryDate={formData.expectedDeliveryDate}
  expectedPickupDate={formData.expectedPickupDate}
  serviceOptions={serviceOptions}
  onInputChange={handleInputChange}
  onSelectChange={handleSelectChange}
/>       {/* Sender Information */}
          <SenderSection
          senderName={formData.senderName}
          packageType={formData.packageType}
          packageTypeOptions={packageTypeOptions}
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
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <TextArea
              placeholder="Any special delivery instructions..."
              rows={3}
              value={formData.specialInstructions}
              onChange={handleTextAreaChange('specialInstructions')}
            />
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Create Package
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
} 