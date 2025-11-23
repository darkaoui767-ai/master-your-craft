import React from 'react';
import type { Author } from '../types';

interface AuthorCardProps {
  author: Author;
  onViewDetails: (key: string) => void;
}

const AuthorCard: React.FC<AuthorCardProps> = ({ author, onViewDetails }) => {
  const coverUrl = `https://covers.openlibrary.org/a/olid/${author.key}-L.jpg?default=false`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Placeholder
  };
  
  return (
    <button
      type="button"
      onClick={() => onViewDetails(author.key)}
      className="group relative flex flex-col text-left w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-900"
    >
      <div className="aspect-w-2 aspect-h-3 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        <img 
          src={coverUrl} 
          alt={`Photo of ${author.name}`} 
          className="h-full w-full object-cover object-center"
          onError={handleImageError} 
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {author.name}
        </h3>
        <div className="flex-grow">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Top Work:</span> {author.top_work || 'N/A'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
             <span className="font-semibold">Born:</span> {author.birth_date || 'N/A'}
          </p>
        </div>
        <div className="flex justify-end items-center mt-2">
          <p className="text-xs italic text-gray-500 dark:text-gray-400">
            {author.work_count.toLocaleString()} works
          </p>
        </div>
      </div>
    </button>
  );
};

export default AuthorCard;