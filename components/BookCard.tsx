import React from 'react';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
  onViewDetails: (key: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onViewDetails }) => {
  const bestEdition = book.editions?.docs?.[0];

  const title = bestEdition?.title || book.title;
  const coverId = bestEdition?.cover_i || book.cover_i;
  const coverUrl = coverId 
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` 
    : 'https://placehold.co/200x300/e2e8f0/475569?text=No+Cover';
    
  return (
    <button
      type="button"
      onClick={() => onViewDetails(book.key)}
      className="text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 dark:focus-visible:ring-offset-slate-900 rounded-lg group"
    >
      <div className="w-full overflow-hidden rounded bg-slate-200 dark:bg-slate-700 shadow-md">
        <img 
          src={coverUrl} 
          alt={`Cover for ${title}`} 
          className="h-full w-full object-cover object-center aspect-[2/3] group-hover:opacity-75 transition-opacity" 
        />
      </div>
      <div className="mt-2 space-y-1.5">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white truncate" title={title}>
          {title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 truncate" title={book.author_name?.join(', ')}>
          {book.author_name?.[0] || 'Unknown Author'}
        </p>
         {book.first_publish_year && (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Published: {book.first_publish_year}
          </p>
        )}
        {book.subject && book.subject.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {book.subject.slice(0, 2).map((s) => (
              <span key={s} className="inline-block bg-slate-200 dark:bg-slate-700 rounded-full px-2 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-full" title={s}>
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export default BookCard;
