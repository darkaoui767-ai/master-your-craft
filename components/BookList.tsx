
import React from 'react';
import type { Book } from '../types';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onViewDetails: (key: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onViewDetails }) => {
  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default BookList;