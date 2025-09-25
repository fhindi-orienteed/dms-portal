import React from 'react';
import Input from '../../form/input/InputField';
import Select from '../../form/Select';
import Label from '../../form/Label';

interface Option {
  value: string;
  label: string;
}

interface Props {
  recipientName: string;
  recipientPhone: string;
  recipientSecondPhone: string;
  priority: string;
  priorityOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function RecipientSection({
  recipientName,
  recipientPhone,
  recipientSecondPhone,
  priority,
  priorityOptions,
  onInputChange,
  onSelectChange
}: Props) {
  return (
    <div className="space-y-4">
      {/* Recipient Name & Mobile Number */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recipient Name */}
        <div>
          <Label htmlFor="recipientName">Recipient Name *</Label>
          <Input
            type="text"
            id="recipientName"
            name="recipientName"
            value={recipientName}
            onChange={onInputChange}
            placeholder="Full name"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <Label htmlFor="recipientPhone">Mobile Number *</Label>
          <Input
            type="tel"
            id="recipientPhone"
            name="recipientPhone"
            value={recipientPhone}
            onChange={onInputChange}
            placeholder="+970 59 123 4567"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Second Mobile Number */}
      <div>
        <Label htmlFor="recipientSecondPhone">Second Mobile Number</Label>
        <Input
          type="tel"
          id="recipientSecondPhone"
          name="recipientSecondPhone"
          value={recipientSecondPhone}
          onChange={onInputChange}
          placeholder="Optional second number"
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Priority */}
      <div>
        <Label htmlFor="priority">Priority</Label>
        <Select
          options={priorityOptions}
          placeholder="Select priority"
          defaultValue={priority}
          onChange={onSelectChange('priority')}
          className="w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}