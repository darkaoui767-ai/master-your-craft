import React, { useState, useEffect } from 'react';
import { getBookDetails } from '../services/openLibraryService';
import type { BookDetails } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface BookDetailProps {
  bookKey: string;
}

const BookDetail: React.FC<BookDetailProps> = ({ bookKey }) => {
  const [details, setDetails] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBookDetails(bookKey);
        setDetails(data);
      } catch (err) {
        setError('Failed to load book details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [bookKey]);

  const getDescription = () => {
    if (!details?.description) return 'No description available.';
    if (typeof details.description === 'string') return details.description;
    return details.description.value;
  };

  const coverId = details?.covers?.[0] ?? null;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : 'https://picsum.photos/300/450?grayscale';

  if (loading) return <div className="p-8"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!details) return null;

  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="sm:col-span-1">
          <img src={coverUrl} alt={`Cover for ${details.title}`} className="w-full h-auto object-contain rounded-lg shadow-lg" />
        </div>
        <div className="sm:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{details.title}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            First published in {details.first_publish_year || 'N/A'}
          </p>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p>{getDescription()}</p>
          </div>
          {details.subjects && details.subjects.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Subjects:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {details.subjects.slice(0, 10).map((subject) => (
                  <span key={subject} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-medium px-2.5 py-1 rounded-full">
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
           <div className="pt-4">
            <a href={`https://openlibrary.org/works/${bookKey}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-semibold">
              View on Open Library
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;