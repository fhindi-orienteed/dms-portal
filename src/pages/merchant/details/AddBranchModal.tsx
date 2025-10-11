import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { showToast } from "../../../utils/toast";

interface AddBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (branch: any) => void;
}

export default function AddBranchModal({ isOpen, onClose, onAdd }: AddBranchModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    manager: ""
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.address || !formData.manager) {
      showToast.error("Please fill in all required fields");
      return;
    }
    onAdd(formData);
    showToast.success("Branch added successfully!");
    setFormData({ name: "", address: "", manager: "" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add New Branch</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Branch Name *</Label>
            <Input
              type="text"
              placeholder="Enter branch name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Address *</Label>
            <Input
              type="text"
              placeholder="Enter branch address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
          <div>
            <Label>Manager Name *</Label>
            <Input
              type="text"
              placeholder="Enter manager name"
              value={formData.manager}
              onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>Add Branch</Button>
        </div>
      </div>
    </Modal>
  );
}
