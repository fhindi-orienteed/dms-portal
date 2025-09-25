import React from "react";
import Input from "../../form/input/InputField";
import Select from "../../form/Select";
import Label from "../../form/Label";

interface Option {
  value: string;
  label: string;
}

interface Props {
  commercialName: string;
  branchAddress: string;
  branchOptions: Option[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string) => (value: string) => void;
}

export default function SenderDetailsSection({
  commercialName,
  branchAddress,
  branchOptions,
  onInputChange,
  onSelectChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="commercialName">Commercial Name</Label>
        <Input
          type="text"
          id="commercialName"
          name="commercialName"
          value={commercialName}
          onChange={onInputChange}
          placeholder="Enter commercial name"
        />
      </div>
      <div>
        <Label htmlFor="branchAddress">Branch Address</Label>
        <Select
          options={branchOptions}
          placeholder="Select branch address"
          defaultValue={branchAddress}
          onChange={onSelectChange("branchAddress")}
        />
      </div>
    </div>
  );
}
