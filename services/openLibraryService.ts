import type { OpenLibrarySearchResponse, OpenLibraryAuthorSearchResponse, SearchFilters, BookDetails, AuthorDetails } from '../types';

const API_BASE_URL = 'https://openlibrary.org';
const PAGE_LIMIT = 24;

const buildQuery = (query: string, filters: SearchFilters): string => {
  let finalQuery = query;

  if (filters.subject?.trim()) {
    finalQuery += ` AND subject:("${filters.subject.trim()}")`;
  }

  if (filters.language?.trim()) {
    finalQuery += ` AND language:${filters.language.trim()}`;
  }

  if (filters.startYear?.trim() || filters.endYear?.trim()) {
    const start = filters.startYear?.trim() || '*';
    const end = filters.endYear?.trim() || '*';
    finalQuery += ` AND publish_year:[${start} TO ${end}]`;
  }

  if (filters.minPages?.trim() || filters.maxPages?.trim()) {
    const min = filters.minPages?.trim() || '*';
    const max = filters.maxPages?.trim() || '*';
    finalQuery += ` AND number_of_pages_median:[${min} TO ${max}]`;
  }

  return finalQuery;
};


export const searchBooks = async (query: string, page: number, filters: SearchFilters = {}, sort: string = '', limit: number = PAGE_LIMIT): Promise<OpenLibrarySearchResponse> => {
  if (!query) {
    return { numFound: 0, start: 0, docs: [] };
  }
  
  const finalQuery = buildQuery(query, filters);
  const fields = 'key,title,author_name,cover_i,first_publish_year,isbn,subject,language,number_of_pages_median,editions,editions.key,editions.title,editions.ebook_access,editions.cover_i';

  try {
    const params = new URLSearchParams({
      q: finalQuery,
      page: page.toString(),
      limit: limit.toString(),
      fields: fields,
    });
    
    if (sort) {
      params.append('sort', sort);
    }

    const response = await fetch(`${API_BASE_URL}/search.json?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as OpenLibrarySearchResponse;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    throw error;
  }
};

export const searchAuthors = async (query: string): Promise<OpenLibraryAuthorSearchResponse> => {
  if (!query) {
    return { numFound: 0, start: 0, docs: [] };
  }
  
  try {
    const params = new URLSearchParams({ q: query });
    const response = await fetch(`${API_BASE_URL}/search/authors.json?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as OpenLibraryAuthorSearchResponse;
  } catch (error) {
    console.error("Failed to fetch authors:", error);
    throw error;
  }
};

export const getBookDetails = async (key: string): Promise<BookDetails> => {
  try {
    const response = await fetch(`${API_BASE_URL}/works/${key}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as BookDetails;
  } catch (error) {
    console.error("Failed to fetch book details:", error);
    throw error;
  }
};

export const getAuthorDetails = async (key: string): Promise<AuthorDetails> => {
  try {
    const response = await fetch(`${API_BASE_URL}/authors/${key}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json() as AuthorDetails;
  } catch (error) {
    console.error("Failed to fetch author details:", error);
    throw error;
  }
};