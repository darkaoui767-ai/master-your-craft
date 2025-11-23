import React from 'react';
import type { Author } from '../types';
import AuthorCard from './AuthorCard';
import NoResults from './NoResults';

interface AuthorListProps {
  authors: Author[];
  onViewDetails: (key: string) => void;
}

const AuthorList: React.FC<AuthorListProps> = ({ authors, onViewDetails }) => {
  if (authors.length === 0) {
    return <NoResults message="No authors found." />;
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {authors.map((author) => (
        <AuthorCard key={author.key} author={author} onViewDetails={onViewDetails} />
      ))}
    </div>
  );
};

export default AuthorList;