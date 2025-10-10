import { useState, useMemo } from "react";
import { ActiveFilter } from "../components/common/FilterDropdown";

interface UseFiltersProps<T> {
  data: T[];
  filters: ActiveFilter[];
  searchTerm: string;
  searchFields?: (keyof T)[];
}

interface FilterGroups {
  [key: string]: {
    label: string;
    values: string[];
  };
}

export function useFilters<T extends Record<string, any>>({
  data,
  filters,
  searchTerm,
  searchFields = []
}: UseFiltersProps<T>) {
  const filteredData = useMemo(() => {
    // Group filters by key to support multiple values per filter
    const filterGroups: FilterGroups = {};
    filters.forEach(filter => {
      if (!filterGroups[filter.key]) {
        filterGroups[filter.key] = {
          label: filter.label,
          values: []
        };
      }
      filterGroups[filter.key].values.push(filter.value);
    });

    return data.filter((item) => {
      // Search filter
      const matchesSearch = searchFields.length === 0 || searchTerm === "" || searchFields.some(field => {
        const value = item[field];
        if (value && typeof value === 'object') {
          // Handle nested objects like recipient.name
          const nestedValue = Object.values(value).find(v => 
            v && v.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
          return !!nestedValue;
        }
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      });

      // Active filters - now supports multiple values per key
      const matchesFilters = Object.entries(filterGroups).every(([key, group]) => {
        let itemValue = item[key];
        
        // Handle nested properties like shippingInfo.carrier
        if (itemValue === undefined && key.includes('.')) {
          const keys = key.split('.');
          itemValue = item;
          for (const keyPart of keys) {
            itemValue = itemValue?.[keyPart];
          }
        }
        
        if (itemValue === undefined) return false;
        
        // Check if item value matches any of the filter values for this key
        return group.values.some(filterValue => {
          // Handle array values (e.g., multiple statuses)
          if (Array.isArray(itemValue)) {
            return itemValue.includes(filterValue);
          }
          
          // Handle string values
          return itemValue.toString() === filterValue;
        });
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, filters, searchTerm, searchFields]);

  return filteredData;
}

export function useFilterManager() {
  const [filters, setFilters] = useState<ActiveFilter[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addFilter = (key: string, label: string, value: string) => {
    setFilters(prev => {
      // Check if this exact filter already exists
      const existing = prev.find(f => f.key === key && f.value === value);
      if (existing) {
        return prev; // Don't add duplicate
      }
      
      // Add the new filter
      return [...prev, { key, label, value }];
    });
  };

  const handleFilterChange = (key: string, value: string | null) => {
    if (value === null) {
      removeFilter(key);
    } else {
      // Get the label from existing filters or use key as fallback
      const existingFilter = filters.find(f => f.key === key);
      const label = existingFilter?.label || key;
      addFilter(key, label, value);
    }
  };

  const removeFilter = (key: string, value?: string) => {
    setFilters(prev => {
      if (value) {
        // Remove specific filter value
        return prev.filter(f => !(f.key === key && f.value === value));
      } else {
        // Remove all filters for this key
        return prev.filter(f => f.key !== key);
      }
    });
  };

  const clearAllFilters = () => {
    setFilters([]);
    setSearchTerm("");
  };

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return {
    filters,
    searchTerm,
    addFilter,
    removeFilter,
    clearAllFilters,
    updateSearchTerm,
    handleFilterChange,
    setFilters
  };
}
