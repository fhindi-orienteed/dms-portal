import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import Label from "../../../components/form/Label";
import { showToast } from "../../../utils/toast";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void;
}

export default function AddUserModal({ isOpen, onClose, onAdd }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    role: "User",
    email: "",
    status: "Active"
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      showToast.error("Please fill in all required fields");
      return;
    }
    onAdd(formData);
    showToast.success("User added successfully!");
    setFormData({ name: "", role: "User", email: "", status: "Active" });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add New User</h3>
        
        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input
              type="text"
              placeholder="Enter user name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label>Role</Label>
            <Select
              options={[
                { value: "Admin", label: "Admin" },
                { value: "User", label: "User" },
                { value: "Manager", label: "Manager" }
              ]}
              defaultValue={formData.role}
              onChange={(value) => setFormData(prev => ({ ...prev, role: value }))}
            />
          </div>
          <div>
            <Label>Status</Label>
            <Select
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" }
              ]}
              defaultValue={formData.status}
              onChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>Add User</Button>
        </div>
      </div>
    </Modal>
  );
}
