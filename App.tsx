import React, { useState, useCallback, useEffect } from 'react';
import { useBookSearch } from './hooks/useBookSearch';

import BookList from './components/BookList';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';
import NoResults from './components/NoResults';
import ThemeToggle from './components/ThemeToggle';
import Modal from './components/Modal';
import BookDetail from './components/BookDetail';
import AuthorDetail from './components/AuthorDetail';
import SearchBar from './components/SearchBar';
import BookCarousel from './components/CategoryPreview'; // Renamed to BookCarousel but keeping file name for now
import Banner from './components/Banner';
import GenreGrid from './components/GenreGrid';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme') as Theme;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
  });
  const [selectedItem, setSelectedItem] = useState<{ type: 'book' | 'author', key: string } | null>(null);

  const bookSearch = useBookSearch();
  const [hasSearched, setHasSearched] = useState(false);
  
  const loading = bookSearch.loading;

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const handleViewDetails = (type: 'book' | 'author', key: string) => {
    const id = key.split('/').pop() ?? ''; 
    setSelectedItem({ type, key: id });
  };

  const handleCloseDetails = () => {
    setSelectedItem(null);
  };

  const handleThemeToggle = () => {
      setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleSearch = useCallback((newQuery: string) => {
    if (!newQuery.trim()) return;
    setQuery(newQuery);
    setPage(1);
    setHasSearched(true);
    window.scrollTo(0, 0);
    bookSearch.performSearch(newQuery, 1, {}, '');
  }, [bookSearch]);


  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo(0, 0);
    bookSearch.performSearch(query, newPage, {}, '');
  }, [query, bookSearch]);

  const handleGoBack = () => {
    setHasSearched(false);
    setQuery('');
    setPage(1);
    bookSearch.resetSearch();
  };

  const renderHomePage = () => (
    <>
      <Banner />
      <BookCarousel
        title="Free Ebooks & Deals"
        query="subject:free ebook"
        onViewDetails={(key) => handleViewDetails('book', key)}
        onViewAll={handleSearch}
      />
      <GenreGrid onSearch={handleSearch} />
       <BookCarousel
        title="Editor's Choice"
        query="subject:bestseller"
        onViewDetails={(key) => handleViewDetails('book', key)}
        onViewAll={handleSearch}
      />
    </>
  );

  const renderSearchResults = () => {
    const goBackButton = (
      <button
        onClick={handleGoBack}
        className="mb-6 inline-flex items-center text-sm font-medium text-slate-600 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Discover
      </button>
    );

    if (loading) {
      return <div className="py-20"><LoadingSpinner /></div>;
    }
    if (bookSearch.error) return <NoResults type="error" message={bookSearch.error} />;
    
    if (bookSearch.books.length > 0) {
      return (
        <>
          {goBackButton}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Search Results</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Showing <span className="font-medium">{((page - 1) * 24) + 1}</span> to <span className="font-medium">{Math.min(page * 24, bookSearch.totalResults)}</span> of{' '}
              <span className="font-medium">{bookSearch.totalResults.toLocaleString()}</span> results for <span className="font-medium">"{query}"</span>
            </p>
          </div>
          <BookList books={bookSearch.books} onViewDetails={(key) => handleViewDetails('book', key)} />
          <Pagination
            currentPage={page}
            totalPages={bookSearch.totalPages}
            onPageChange={handlePageChange}
            isLoading={loading}
          />
        </>
      );
    }

    if (hasSearched && !loading) {
      return (
        <div>
          {goBackButton}
          <NoResults type="no-results" message={`No results found for "${query}".`} />
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <a href="/" className="flex items-center" aria-label="Book Explorer Home" onClick={(e) => { e.preventDefault(); handleGoBack(); }}>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Book Explorer</h1>
            </a>
            <div className="flex-1 px-8 hidden sm:block">
              {!hasSearched && <SearchBar onSearch={handleSearch} isLoading={loading} />}
            </div>
            <div className="flex items-center space-x-2">
                <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="bg-slate-50 dark:bg-slate-950">
        {hasSearched ? (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              {renderSearchResults()}
            </div>
        ) : renderHomePage()}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by the <a href="https://openlibrary.org/developers/api" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">Open Library API</a>.</p>
          <p>&copy; {new Date().getFullYear()} Book Explorer. All rights reserved.</p>
        </div>
      </footer>

      {selectedItem && (
        <Modal isOpen={!!selectedItem} onClose={handleCloseDetails}>
          {selectedItem.type === 'book' && <BookDetail bookKey={selectedItem.key} />}
          {selectedItem.type === 'author' && <AuthorDetail authorKey={selectedItem.key} />}
        </Modal>
      )}
    </div>
  );
};

export default App;