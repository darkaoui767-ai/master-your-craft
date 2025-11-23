import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
           <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="block w-full rounded-md border-0 py-4 pl-12 pr-24 text-slate-900 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:text-white dark:ring-slate-700 dark:focus:ring-sky-500 disabled:opacity-50"
          placeholder="Search for books, authors, or topics..."
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-0.5 right-0.5 flex items-center rounded-md bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:bg-sky-400 disabled:cursor-not-allowed transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:hidden" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <span className="hidden md:inline">{isLoading ? '...' : 'Search'}</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
