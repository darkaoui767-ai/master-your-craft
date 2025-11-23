import { useState, useCallback } from 'react';
// FIX: Module '"../services/openLibraryService"' declares 'SearchFilters' locally, but it is not exported. It should be imported from '../types'.
import type { Book, SearchFilters } from '../types';
import { searchBooks } from '../services/openLibraryService';

interface BookSearchState {
  books: Book[];
  totalResults: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: BookSearchState = {
  books: [],
  totalResults: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

export const useBookSearch = () => {
  const [searchState, setSearchState] = useState<BookSearchState>(initialState);

  const performSearch = useCallback(async (query: string, page: number, filters: SearchFilters, sort: string) => {
    setSearchState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const result = await searchBooks(query, page, filters, sort);
      setSearchState({
        books: result.docs,
        totalResults: result.numFound,
        totalPages: Math.ceil(result.numFound / 24),
        loading: false,
        error: null,
      });
    } catch (err) {
      setSearchState(prevState => ({
        ...prevState,
        books: [],
        totalResults: 0,
        totalPages: 0,
        loading: false,
        error: 'Failed to fetch books. Please check your connection.',
      }));
    }
  }, []);

  const resetSearch = useCallback(() => {
    setSearchState(initialState);
  }, []);

  return { ...searchState, performSearch, resetSearch };
};