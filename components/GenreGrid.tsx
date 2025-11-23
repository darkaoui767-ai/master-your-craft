import React from 'react';

interface GenreGridProps {
    onSearch: (query: string) => void;
}

const genres = [
    { name: 'Romance', img: 'https://images.unsplash.com/photo-1518981840399-880993078aa3?q=80&w=400' },
    { name: 'Action & Adventure', img: 'https://images.unsplash.com/photo-1608222351239-85a74659f234?q=80&w=400' },
    { name: 'Mystery & Thriller', img: 'https://images.unsplash.com/photo-1588196749107-1a2a43972c3d?q=80&w=400' },
    { name: 'Biographies & History', img: 'https://images.unsplash.com/photo-1552042139-2e1a38a22de0?q=80&w=400' },
    { name: 'Children\'s', img: 'https://images.unsplash.com/photo-1516627145428-11149b4c09de?q=80&w=400' },
    { name: 'Young Adult', img: 'https://images.unsplash.com/photo-1534244690564-6f3b064c1a84?q=80&w=400' },
    { name: 'Fantasy', img: 'https://images.unsplash.com/photo-1605164923588-8c1c58519894?q=80&w=400' },
    { name: 'Historical Fiction', img: 'https://images.unsplash.com/photo-1524304853013-a178106a7432?q=80&w=400' },
    { name: 'Horror', img: 'https://images.unsplash.com/photo-1598038162294-1b738b57b98d?q=80&w=400' },
    { name: 'Literary Fiction', img: 'https://images.unsplash.com/photo-1515155208990-2a061b248a52?q=80&w=400' },
    { name: 'Non-Fiction', img: 'https://images.unsplash.com/photo-1491841550275-5b462bf48545?q=80&w=400' },
    { name: 'Science Fiction', img: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=400' },
]

const GenreCard: React.FC<{ genre: typeof genres[0], onSearch: (query:string) => void }> = ({ genre, onSearch }) => (
    <button onClick={() => onSearch(`subject:"${genre.name}"`)} className="relative aspect-video w-full rounded overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500">
        <img src={genre.img} alt={genre.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all flex items-center justify-center p-2">
            <h3 className="text-white text-center font-bold uppercase tracking-wider text-sm">{genre.name}</h3>
        </div>
    </button>
);


const GenreGrid: React.FC<GenreGridProps> = ({ onSearch }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Browse Genres</h2>
        <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-sm font-medium text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200">
          View all
        </a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {genres.map(genre => <GenreCard key={genre.name} genre={genre} onSearch={onSearch} />)}
      </div>
    </div>
  );
};

export default GenreGrid;
