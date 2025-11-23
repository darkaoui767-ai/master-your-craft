import { useState, useCallback } from 'react';
import type { Author } from '../types';
import { searchAuthors } from '../services/openLibraryService';

interface AuthorSearchState {
  authors: Author[];
  totalResults: number;
  loading: boolean;
  error: string | null;
}

export const useAuthorSearch = () => {
  const [searchState, setSearchState] = useState<AuthorSearchState>({
    authors: [],
    totalResults: 0,
    loading: false,
    error: null,
  });

  const performSearch = useCallback(async (query: string) => {
    setSearchState(prevState => ({ ...prevState, loading: true, error: null }));
    try {
      const result = await searchAuthors(query);
      setSearchState({
        authors: result.docs,
        totalResults: result.numFound,
        loading: false,
        error: null,
      });
    } catch (err) {
      setSearchState(prevState => ({
        ...prevState,
        authors: [],
        totalResults: 0,
        loading: false,
        error: 'Failed to fetch authors. Please try again later.',
      }));
    }
  }, []);

  return { ...searchState, performSearch };
};
