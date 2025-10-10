import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "../../icons";
import Button from "../ui/button/Button";

export interface FilterOption {
  key: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}

export interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

interface FilterDropdownProps {
  filters: FilterOption[];
  activeFilters: ActiveFilter[];
  onFilterChange: (key: string, value: string | null) => void;
  onRemoveFilter?: (key: string, value: string) => void;
  onClearAll: () => void;
  placeholder?: string;
}

export default function FilterDropdown({
  filters,
  activeFilters,
  onFilterChange,
  onRemoveFilter,
  onClearAll,
  placeholder = "Add filter"
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredFilters = filters.filter(filter =>
    filter.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterSelect = (filterKey: string, value: string) => {
    onFilterChange(filterKey, value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const removeFilter = (filterKey: string, filterValue?: string) => {
    if (onRemoveFilter && filterValue) {
      onRemoveFilter(filterKey, filterValue);
    } else {
      onFilterChange(filterKey, null);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Active Filters Display - Fixed height to prevent layout shift */}
      <div className="mb-4 mt-4">
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {activeFilters.map((filter) => (
              <div
                key={filter.key}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-md text-blue-700 dark:text-blue-300 text-xs font-medium"
              >
                <span className="text-blue-600 dark:text-blue-400">{filter.label}:</span>
                <span className="text-blue-800 dark:text-blue-200">{filter.value}</span>
                <button
                  onClick={() => removeFilter(filter.key, filter.value)}
                  className="ml-1 p-0.5 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded-full transition-colors group"
                >
                  <svg className="size-3 text-blue-500 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            
            <button
              onClick={onClearAll}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 transition-all duration-200 ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}`}
        >
          {placeholder}
          <ChevronDownIcon 
            className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </Button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search filters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg className="size-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filter Options */}
            <div className="max-h-72 overflow-y-auto">
              {filteredFilters.length === 0 ? (
                <div className="p-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-300 dark:text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.625" />
                  </svg>
                  No filters found
                </div>
              ) : (
                filteredFilters.map((filter) => (
                  <div key={filter.key} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="p-4">
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        {filter.label}
                      </div>
                      <div className="space-y-1">
                        {filter.options.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleFilterSelect(filter.key, option.value)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg transition-all duration-150 group"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-150 inline-block">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
