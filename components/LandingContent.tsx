import React, { useState, useEffect } from 'react';
import { searchBooks } from '../services/openLibraryService';
import type { Book } from '../types';
import BookCard from './BookCard';
import LoadingSpinner from './LoadingSpinner';

interface LandingContentProps {
  onViewDetails: (type: 'book' | 'author', key: string) => void;
}

const LandingContent: React.FC<LandingContentProps> = ({ onViewDetails }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchFeaturedBooks = async () => {
        try {
          setLoading(true);
          const data = await searchBooks('subject:"management"', 1, {}, 'random', 6);
          setBooks(data.docs);
        } catch (error) {
          console.error(`Failed to fetch featured books:`, error);
        } finally {
          setLoading(false);
        }
      };
      fetchFeaturedBooks();
    }, []);

    return (
        <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Featured Books</h2>
                    {loading ? <div className="h-96 flex items-center justify-center"><LoadingSpinner /></div> : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {books.map(book => (
                                <BookCard key={book.key} book={book} onViewDetails={(key) => onViewDetails('book', key)} />
                            ))}
                        </div>
                    )}
                </div>
                 <div>
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Testimonials</h2>
                    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                        <img className="h-24 w-24 rounded-full object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop" alt="Testimonial" />
                        <div className="mt-6">
                            <p className="text-xl font-semibold text-slate-900 dark:text-white">PRO READS</p>
                            <blockquote className="mt-2 text-slate-600 dark:text-slate-300">
                                <p>"Yeo sullerse in Wells nay it oter unaided piliary use rotes, unsti. Alti invore odisse orients to teced iurst of foul berling may lino sy tenent."</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingContent;
