import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';
import Select from '../form/Select';
import Label from '../form/Label';

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
    // Sender Details
    commercialName: '',
    branchAddress: '',
    recipientSecondPhone: '',
    recipientAddressDetails: '',
    itemsCount: '',
    note: '',
    packageContent: '',
    packageWeight: '',
    privateNote: '',

    // Properties
    fragile: false,
    needsPackaging: false,
    recipientFingerprint: false,
    flammable: false,
    destructible: false,
    preventOpening: false,
    deliveryNote: false,
    preventMeasuring: false,
    serviceType: '',
    invoiceNumber: '',
    expectedDeliveryDate: '',
    expectedPickupDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div className="p-6 overflow-y-auto max-h-[100vh] ">
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
          <div>
            <Label htmlFor="trackingNumber">Tracking Number *</Label>
            <Input
              type="text"
              id="trackingNumber"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleInputChange}
              placeholder="Enter tracking number"
            />
          </div>
          {/* Sender Details */}
<div className="mb-6">
 

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Commercial Name */}
    <div>
      <Label htmlFor="commercialName">Commercial Name *</Label>
      <Input
        type="text"
        id="commercialName"
        name="commercialName"
        value={formData.commercialName}
        onChange={handleInputChange}
        placeholder="Enter commercial name"
      />
    </div>

    {/* Branch Address */}
    <div>
      <Label htmlFor="branchAddress">Branch Address *</Label>
      <Select
        options={[
          { value: 'branch1', label: 'Branch 1' },
          { value: 'branch2', label: 'Branch 2' },
          { value: 'branch3', label: 'Branch 3' }
        ]}
        placeholder="Select branch address"
        defaultValue={formData.branchAddress}
        onChange={(value: string) =>
          setFormData(prev => ({ ...prev, branchAddress: value }))
        }
      />
    </div>
  </div>
</div>

         {/* Recipient Information */}
<div className="mb-6">
  

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Recipient Name */}
    <div>
      <Label htmlFor="recipientName">Recipient Name *</Label>
      <Input
        type="text"
        id="recipientName"
        name="recipientName"
        value={formData.recipientName}
        onChange={handleInputChange}
        placeholder="Full name"
      />
    </div>

    {/* Mobile Number */}
    <div>
      <Label htmlFor="recipientPhone">Mobile Number *</Label>
      <Input
        type="tel"
        id="recipientPhone"
        name="recipientPhone"
        value={formData.recipientPhone}
        onChange={handleInputChange}
        placeholder="+970 59 123 4567"
      />
    </div>
  </div>

  {/* Second Mobile Number */}
  <div className="mt-4">
    <Label htmlFor="recipientSecondPhone">Second Mobile Number</Label>
    <Input
      type="tel"
      id="recipientSecondPhone"
      name="recipientSecondPhone"
      value={formData.recipientSecondPhone}
      onChange={handleInputChange}
      placeholder="Optional second number"
    />
  </div>

  {/* Recipient Address */}
  <div className="mt-4">
    <Label htmlFor="recipientAddress">Recipient Address *</Label>
    <Input
      type="text"
      id="recipientAddress"
      name="recipientAddress"
      value={formData.recipientAddress}
      onChange={handleInputChange}
      placeholder="Start typing address..."
    />
  </div>

  {/* Recipient Address details */}
  <div className="mt-4">
    <Label htmlFor="recipientAddressDetails">Recipient Address Details</Label>
    <TextArea
      placeholder="Apartment, floor, directions..."
      rows={2}
      value={formData.recipientAddressDetails}
      onChange={handleTextAreaChange('recipientAddressDetails')}
    />
  </div>
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recipientPhone">Recipient Phone *</Label>
              <Input
                type="tel"
                id="recipientPhone"
                name="recipientPhone"
                value={formData.recipientPhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                options={priorityOptions}
                placeholder="Select priority"
                defaultValue={formData.priority}
                onChange={handleSelectChange('priority')}
              />
            </div>
          </div>

          {/* Recipient Address */}
          <div>
            <Label htmlFor="recipientAddress">Recipient Address *</Label>
            <TextArea
              placeholder="Street address, city, state, postal code"
              rows={3}
              value={formData.recipientAddress}
              onChange={handleTextAreaChange('recipientAddress')}
            />
          </div>

          {/* Sender Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="senderName">Sender Name</Label>
              <Input
                type="text"
                id="senderName"
                name="senderName"
                value={formData.senderName}
                onChange={handleInputChange}
                placeholder="Sender name"
              />
            </div>
            <div>
              <Label htmlFor="packageType">Package Type</Label>
              <Select
                options={packageTypeOptions}
                placeholder="Select type"
                defaultValue={formData.packageType}
                onChange={handleSelectChange('packageType')}
              />
            </div>
          </div>
{/* Service & Order Information */}
<div className="mb-6">
  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
    Service & Order Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Service Type */}
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Service Type
      </label>
      <select
        value={formData.serviceType}
        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Service</option>
        <option value="standard">Standard Delivery</option>
        <option value="express">Express Delivery</option>
        <option value="sameDay">Same Day Delivery</option>
      </select>
    </div>

    {/* Invoice Number */}
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Invoice Number
      </label>
      <input
        type="text"
        value={formData.invoiceNumber}
        onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
        placeholder="Enter invoice number"
        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Expected Delivery Date */}
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Expected Delivery Date
      </label>
      <input
        type="date"
        value={formData.expectedDeliveryDate}
        onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Expected Pickup Date */}
    <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
        Expected Pickup Date
      </label>
      <input
        type="date"
        value={formData.expectedPickupDate}
        onChange={(e) => setFormData({ ...formData, expectedPickupDate: e.target.value })}
        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
</div>
         {/* Package Details */}
<div className="mb-6">
  

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Items Count */}
    <div>
      <Label htmlFor="itemsCount">Items Count *</Label>
      <Input
        type="number"
        id="itemsCount"
        name="itemsCount"
        value={formData.itemsCount}
        onChange={handleInputChange}
        placeholder="e.g., 3"
      />
    </div>

    {/* Package Weight */}
    <div>
      <Label htmlFor="packageWeight">Package Weight (kg) *</Label>
      <Input
        type="number"
        id="packageWeight"
        name="packageWeight"
        value={formData.packageWeight}
        onChange={handleInputChange}
        placeholder="0.5"
        step={0.1}
      />
    </div>
  </div>

  {/* Package Content */}
  <div className="mt-4">
    <Label htmlFor="packageContent">Package Content *</Label>
    <Input
      type="text"
      id="packageContent"
      name="packageContent"
      value={formData.packageContent}
      onChange={handleInputChange}
      placeholder="e.g., Clothes, Electronics"
    />
  </div>

  {/* Note */}
  <div className="mt-4">
    <Label htmlFor="note">Note</Label>
    <TextArea
      placeholder="General notes..."
      rows={2}
      value={formData.note}
      onChange={handleTextAreaChange('note')}
    />
  </div>

  {/* Private Note */}
  <div className="mt-4">
    <Label htmlFor="privateNote">Private Note</Label>
    <TextArea
      placeholder="Internal note (not visible to recipient)..."
      rows={2}
      value={formData.privateNote}
      onChange={handleTextAreaChange('privateNote')}
    />
  </div>
</div>
            {/* Properties */}
<div className="mb-6">
  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
    Properties
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { key: 'fragile', label: 'Fragile' },
      { key: 'needsPackaging', label: 'Needs Packaging' },
      { key: 'recipientFingerprint', label: 'Recipient fingerprint required' },
      { key: 'flammable', label: 'Contains Flammable or dangerous materials' },
      { key: 'destructible', label: 'Destructible' },
      { key: 'preventOpening', label: 'Prevent opening' },
      { key: 'deliveryNote', label: 'Delivery Note' },
      { key: 'preventMeasuring', label: 'Prevent Measuring' },
    ].map((prop) => (
      <div
        key={prop.key}
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            [prop.key]: !prev[prop.key as keyof typeof formData],
          }))
        }
        className={`cursor-pointer p-4 rounded-lg border transition ${
          formData[prop.key as keyof typeof formData]
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <span>{prop.label}</span>
          {formData[prop.key as keyof typeof formData] && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
    ))}
  </div>
</div>
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