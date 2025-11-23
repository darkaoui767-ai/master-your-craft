import React, { useState, useEffect } from 'react';
import { getAuthorDetails } from '../services/openLibraryService';
import type { AuthorDetails } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface AuthorDetailProps {
  authorKey: string;
}

const AuthorDetail: React.FC<AuthorDetailProps> = ({ authorKey }) => {
  const [details, setDetails] = useState<AuthorDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAuthorDetails(authorKey);
        setDetails(data);
      } catch (err) {
        setError('Failed to load author details.');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [authorKey]);

  const getBio = () => {
    if (!details?.bio) return 'No biography available.';
    if (typeof details.bio === 'string') return details.bio;
    return details.bio.value;
  };

  const coverUrl = `https://covers.openlibrary.org/a/olid/${authorKey}-L.jpg?default=false`;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'; // Placeholder
  };
  
  if (loading) return <div className="p-8"><LoadingSpinner /></div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!details) return null;

  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="sm:col-span-1">
          <img src={coverUrl} alt={`Photo of ${details.name}`} onError={handleImageError} className="w-full h-auto object-contain rounded-lg shadow-lg" />
        </div>
        <div className="sm:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{details.name}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
             Born: {details.birth_date || 'N/A'}
             {details.death_date && ` - Died: ${details.death_date}`}
          </p>
          <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p>{getBio()}</p>
          </div>
          {details.alternate_names && details.alternate_names.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">Alternate Names:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                {details.alternate_names.join(', ')}
              </p>
            </div>
          )}
          <div className="pt-4">
            <a href={`https://openlibrary.org/authors/${authorKey}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 font-semibold">
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

export default AuthorDetail;
