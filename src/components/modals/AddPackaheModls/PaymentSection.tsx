import React from 'react';
import Input from '../../form/input/InputField';
import Select from '../../form/Select';
import Label from '../../form/Label';

interface Option {
  value: string;
  label: string;
}

interface Props {
  shipmentType: string;
  codAmount: string;
  collectionMethod: string;
  shipmentOptions: Option[];
  collectionOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function PaymentSection({
  shipmentType,
  codAmount,
  collectionMethod,
  shipmentOptions,
  collectionOptions,
  onInputChange,
  onSelectChange
}: Props) {
  return (
    <div className="space-y-4">
      {/* Shipment Type */}
      <div>
        <Label htmlFor="shipmentType">Shipment Type</Label>
        <Select
          options={shipmentOptions}
          placeholder="Select shipment type"
          defaultValue={shipmentType}
          onChange={onSelectChange('shipmentType')}
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* COD Amount */}
      <div>
        <Label htmlFor="codAmount">COD (Delivery charges + price)</Label>
        <Input
          type="text"
          id="codAmount"
          name="codAmount"
          value={codAmount}
          onChange={onInputChange}
          placeholder="Enter amount"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Collection Method */}
      <div>
        <Label htmlFor="collectionMethod">Collection Method</Label>
        <Select
          options={collectionOptions}
          placeholder="Select collection method"
          defaultValue={collectionMethod}
          onChange={onSelectChange('collectionMethod')}
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}