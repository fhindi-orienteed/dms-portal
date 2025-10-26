import { useState } from "react";
import { Button } from "../ui";
import Switch from "../form/switch/Switch";

interface IntegrationCardProps {
  id: string;
  name: string;
  description: string;
  logo: string;
  isActive: boolean;
  onToggle?: (id: string, isActive: boolean) => void;
  onDetails?: (id: string) => void;
  onSettings?: (id: string) => void;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  id,
  name,
  description,
  logo,
  isActive: initialActive,
  onToggle,
  onDetails,
  onSettings,
}) => {
  const [isActive, setIsActive] = useState(initialActive);

  const handleToggle = (checked: boolean) => {
    setIsActive(checked);
    onToggle?.(id, checked);
  };

  const handleDetails = () => {
    onDetails?.(id);
  };

  const handleSettings = () => {
    onSettings?.(id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
      {/* Header with Logo and Settings */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            <img 
              src={logo} 
              alt={`${name} logo`}
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback to a generic icon if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                  </svg>
                `;
              }}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
        </div>
        
        {/* Settings Button */}
        <button
          onClick={handleSettings}
          className="p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
        {description}
      </p>

      {/* Footer with Details Button and Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDetails}
          className="text-gray-700 dark:text-gray-300"
        >
          Details
        </Button>
        
        <Switch
          label=""
          defaultChecked={isActive}
          onChange={handleToggle}
          color="blue"
        />
      </div>
    </div>
  );
};

export default IntegrationCard;
