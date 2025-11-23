import React, { useState, useEffect, useRef } from 'react';
import { searchBooks } from '../services/openLibraryService';
import type { Book } from '../types';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

interface BookCarouselProps {
  title: string;
  query: string;
  onViewDetails: (key: string) => void;
  onViewAll: (query: string) => void;
}

const BookCarousel: React.FC<BookCarouselProps> = ({ title, query, onViewDetails, onViewAll }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        setLoading(true);
        const data = await searchBooks(query, 1, {}, 'random', 15);
        setBooks(data.docs);
      } catch (error) {
        console.error(`Failed to fetch books for query ${query}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryBooks();
  }, [query]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
        const scrollAmount = scrollContainer.current.offsetWidth * 0.8;
        scrollContainer.current.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }
  };


  if (books.length === 0 && !loading) {
    return null; // Don't render if no books and not loading
  }

  return (
    <div className="py-6 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <button onClick={() => onViewAll(query)} className="text-sm font-medium text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200">
          View all
        </button>
      </div>
      <div className="relative">
        {loading ? (
            <div className="h-72 flex justify-center items-center"><LoadingSpinner /></div>
        ) : (
          <>
            <button
                onClick={() => handleScroll('left')}
                className="absolute top-1/2 -left-4 z-10 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Scroll left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <div ref={scrollContainer} className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
              {books.map(book => (
                <div key={book.key} className="flex-shrink-0 w-36">
                  <BookCard book={book} onViewDetails={onViewDetails} />
                </div>
              ))}
            </div>
            <button
                onClick={() => handleScroll('right')}
                className="absolute top-1/2 -right-4 z-10 -translate-y-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                aria-label="Scroll right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;