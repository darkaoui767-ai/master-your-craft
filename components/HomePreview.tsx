import React from 'react';
import CategoryPreview from './CategoryPreview';

interface HomePreviewProps {
    onViewDetails: (type: 'book' | 'author', key: string) => void;
}

const categories = [
    'Science Fiction',
    'Fantasy',
    'Mystery',
    'History',
    'Romance',
    'Classic Literature'
];

const HomePreview: React.FC<HomePreviewProps> = ({ onViewDetails }) => {
  return (
    <div className="space-y-8">
       <div className="text-center py-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl">Discover Your Next Read</h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">Browse through popular categories or use the search bar above.</p>
      </div>
      {categories.map(category => (
        // FIX: Pass correct props to CategoryPreview (BookCarousel). It expects 'title' and 'query', not 'category'. Also added a placeholder for the required 'onViewAll' prop.
        <CategoryPreview 
            key={category} 
            title={category}
            query={`subject:"${category}"`}
            onViewDetails={(key) => onViewDetails('book', key)} 
            onViewAll={() => {}}
        />
      ))}
    </div>
  );
};

export default HomePreview;
