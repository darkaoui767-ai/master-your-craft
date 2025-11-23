import React from 'react';

type SearchMode = 'books' | 'authors';

interface SearchModeToggleProps {
  mode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
}

const SearchModeToggle: React.FC<SearchModeToggleProps> = ({ mode, onModeChange }) => {
  const baseClasses = "px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800 transition-colors duration-200";
  const activeClasses = "bg-teal-600 text-white shadow-sm";
  const inactiveClasses = "text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600";
  
  return (
    <div className="flex space-x-2 rounded-md bg-gray-200 dark:bg-gray-700 p-1">
      <button
        onClick={() => onModeChange('books')}
        className={`${baseClasses} ${mode === 'books' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'books'}
      >
        Search Books
      </button>
      <button
        onClick={() => onModeChange('authors')}
        className={`${baseClasses} ${mode === 'authors' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'authors'}
      >
        Search Authors
      </button>
    </div>
  );
};

export default SearchModeToggle;
