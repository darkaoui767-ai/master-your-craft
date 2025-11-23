import React from 'react';

interface NoResultsProps {
  message: string;
  type?: 'no-results' | 'error';
}

const NoResults: React.FC<NoResultsProps> = ({ message, type = 'no-results' }) => {
  const icons = {
    'no-results': (
      <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    'error': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  };

  const subtitles = {
    'no-results': 'Try adjusting your search or check your spelling.',
    'error': 'Please check your connection and try again.'
  };

  return (
    <div className="text-center py-16 px-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
        {icons[type]}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{message}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitles[type]}</p>
    </div>
  );
};

export default NoResults;