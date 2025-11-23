import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="relative bg-gray-800 text-white text-center py-12 sm:py-16 px-4">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1550399105-c4db5fb85c18?q=80&w=2071&auto=format&fit=crop"
          alt="Collage of book covers"
        />
        <div className="absolute inset-0 bg-transparent" aria-hidden="true"></div>
      </div>
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] font-bebas">Free and Discounted Bestsellers</h1>
      </div>
    </div>
  );
};

export default Banner;