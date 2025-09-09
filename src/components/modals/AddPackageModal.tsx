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
    priority: 'standard'
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
      <div className="p-6">
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

          {/* Recipient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div>
              <Label htmlFor="recipientEmail">Recipient Email *</Label>
              <Input
                type="email"
                id="recipientEmail"
                name="recipientEmail"
                value={formData.recipientEmail}
                onChange={handleInputChange}
                placeholder="email@example.com"
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

          {/* Package Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="0.5"
                step={0.1}
              />
            </div>
            <div>
              <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
              <Input
                type="text"
                id="dimensions"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                placeholder="10×10×5 cm"
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
              />
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