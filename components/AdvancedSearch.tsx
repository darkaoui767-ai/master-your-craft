import React from 'react';
// FIX: Module '"../services/openLibraryService"' declares 'SearchFilters' locally, but it is not exported. It should be imported from '../types'.
import type { SearchFilters } from '../types';

interface AdvancedSearchProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ filters, onFilterChange, onClear }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Publication Year */}
        <fieldset className="col-span-1">
          <legend className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Publication Year</legend>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="startYear"
              placeholder="From"
              value={filters.startYear || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              name="endYear"
              placeholder="To"
              value={filters.endYear || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </fieldset>

        {/* Page Count */}
        <fieldset className="col-span-1">
          <legend className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Page Count</legend>
          <div className="flex items-center gap-2">
            <input
              type="number"
              name="minPages"
              placeholder="Min"
              value={filters.minPages || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              name="maxPages"
              placeholder="Max"
              value={filters.maxPages || ''}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
        </fieldset>
        
        {/* Genre/Subject */}
        <div className="col-span-1">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Genre / Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="e.g., science fiction"
            value={filters.subject || ''}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>
        
        {/* Language */}
        <div className="col-span-1">
          <label htmlFor="language" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
            Language (ISO code)
          </label>
          <input
            type="text"
            name="language"
            id="language"
            placeholder="e.g., eng, fre"
            value={filters.language || ''}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

      </div>
      <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-semibold text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300"
          >
            Clear Filters
          </button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
