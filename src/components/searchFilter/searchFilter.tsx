import React, { useState } from "react";

interface Filter {
  key: string;
  label: string;
  value: string;
}

interface SearchFilterProps {
  onSearch: (term: string) => void;
  filters: Filter[];
  onFilterChange: (key: string, value: string | null) => void;
  onClearFilters: () => void;
}

const allowedFilters = [
  {
    key: "status",
    label: "Status",
    options: ["Pending", "In Transit", "Delivered", "Failed Delivery"],
  },
  {
    key: "carrier",
    label: "Carrier",
    options: ["PalPost Express", "PalPost Standard", "PalPost Economy"],
  },
  {
    key: "city",
    label: "City",
    options: ["Ramallah", "Nablus", "Hebron", "Jenin"],
  },
];

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const handleAddFilter = (filterKey: string) => {
    if (!filters.find((f) => f.key === filterKey)) {
      onFilterChange(filterKey, "");
    }
    setShowFilterMenu(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-3 border border-gray-200">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex items-center gap-3 flex-wrap mt-3">
        {filters.map((filter) => {
          const filterConfig = allowedFilters.find((f) => f.key === filter.key);
          return (
            <div
              key={filter.key}
              className="flex items-center gap-2 border px-2 py-1 rounded-md bg-gray-50"
            >
              <span className="font-medium text-sm">
                {filterConfig?.label}:
              </span>
              <select
                value={filter.value || ""}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="">Select...</option>
                {filterConfig?.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button
                onClick={() => onFilterChange(filter.key, null)}
                className="text-red-500 font-bold text-sm"
              >
                ×
              </button>
            </div>
          );
        })}

        <div className="relative">
          <button
            onClick={() => setShowFilterMenu((prev) => !prev)}
            className="flex items-center gap-1 border px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Add filter
          </button>
          {showFilterMenu && (
            <div className="absolute mt-1 bg-white border rounded shadow p-2 z-10">
              {allowedFilters.map((f) => (
                <button
                  key={f.key}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-sm"
                  onClick={() => handleAddFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {filters.length > 0 && (
          <button
            onClick={onClearFilters}
            className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
