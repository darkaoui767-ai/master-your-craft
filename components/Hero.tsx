import React from 'react';
import SearchBar from './SearchBar';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const Hero: React.FC<HeroProps> = ({ onSearch, isLoading }) => {
    const handleCategoryClick = (category: string) => {
        onSearch(category);
    }

  return (
    <div className="relative bg-slate-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
          alt="Library background"
        />
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" aria-hidden="true" />
      </div>
      <div className="relative max-w-4xl mx-auto text-center py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Unlock Expert Knowledge.
        </h1>
        <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
          Your Professional Knowledge Hub
        </p>
        <div className="mt-8">
          <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </div>
        <div className="mt-6 flex justify-center items-center gap-4 flex-wrap">
            <button onClick={() => handleCategoryClick('Engineering')} className="bg-white/10 text-white backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/20 transition">Engineering</button>
            <button onClick={() => handleCategoryClick('Law')} className="bg-white/10 text-white backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/20 transition">Law</button>
            <button onClick={() => handleCategoryClick('Biotechnology')} className="bg-white/10 text-white backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white/20 transition">Biotech</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
