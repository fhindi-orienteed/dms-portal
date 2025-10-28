import { useState } from "react";
import { Modal } from "../../../components/ui/modal";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import { showToast } from "../../../utils/toast";



interface AddMerchantModalProps {
isOpen:boolean;
onClose:()=>void;
onAdd: (merchant: any) => void;

}


export default function AddMerchantModal({ isOpen, onClose, onAdd }: AddMerchantModalProps) {
 const [formData, setFormData] = useState({
   businessName: "",
    registrationNumber: "",
    email: "",
    phone: "",
    address: "",
  });
const handleSubmit = () => {
const { businessName, registrationNumber, email, phone, address } = formData;
    if (!businessName || !registrationNumber || !email || !phone || !address) {
      showToast.error("Please fill in all required fields");
      return;
    }
    onAdd(formData);
    showToast.success("Merchant added successfully!");
    setFormData({
      businessName: "",registrationNumber: "",email: "",phone: "",address: "",
    });


 };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Add New Branch</h3>
        
        <div className="space-y-4">
          <div>
            <Label>business Name *</Label>
            <Input
              type="text"
              placeholder="Enter business Name"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
            />
          </div>
          <div>
            <Label>registration Number*</Label>
            <Input
              type="text"
              placeholder="Enter registration Number"
              value={formData.registrationNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
            />
          </div>
          <div>
            <Label>email *</Label>
            <Input
              type="text"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label>phone *</Label>
            <Input
              type="text"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
           <div>
            <Label>address *</Label>
            <Input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="secondary" size="sm" onClick={onClose}>Cancel</Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>Add Merchant</Button>
        </div>
      </div>
    </Modal>
  );


}