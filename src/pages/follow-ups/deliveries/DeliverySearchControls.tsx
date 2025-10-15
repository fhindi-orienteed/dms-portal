import { SearchIcon, PencilIcon } from "../../../icons";
import Input from "../../../components/form/input/InputField";
import Button from "../../../components/ui/button/Button";

interface DeliverySearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onNewFollowUp: () => void;
}

export default function DeliverySearchControls({ searchTerm, onSearchChange, onNewFollowUp }: DeliverySearchControlsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400 z-10" />
          <Input
            placeholder="Search delivery follow-ups..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        <Button variant="primary" startIcon={<PencilIcon className="size-4" />} onClick={onNewFollowUp}>
          New Delivery Follow-up
        </Button>
      </div>
    </div>
  );
}
