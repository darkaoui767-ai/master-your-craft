import React from 'react';

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
      <label htmlFor="sort-by" className="sr-only">
        Sort by
      </label>
      <select
        id="sort-by"
        name="sort-by"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
      >
        <option value="">Sort by Relevance</option>
        <option value="new">Newest First</option>
        <option value="old">Oldest First</option>
      </select>
    </div>
  );
};

export default SortDropdown;
