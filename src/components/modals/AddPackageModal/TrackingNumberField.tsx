import React from "react";
import Input from "../../form/input/InputField";
import Label from "../../form/Label";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TrackingNumberField({ value, onChange }: Props) {
  return (
    <div>
      <Label htmlFor="trackingNumber">Tracking Number *</Label>
      <Input
        type="text"
        id="trackingNumber"
        name="trackingNumber"
        value={value}
        onChange={onChange}
        placeholder="Enter tracking number"
      />
    </div>
  );
}
