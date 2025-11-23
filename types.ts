export interface Edition {
  key: string;
  title: string;
  ebook_access?: 'public' | 'borrowable' | 'restricted' | 'printdisabled' | 'no_ebook';
  cover_i?: number;
}

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  isbn?: string[];
  subject?: string[];
  language?: string[];
  number_of_pages_median?: number;
  editions?: {
    numFound: number;
    start: number;
    docs: Edition[];
  }
}

export interface Author {
  key: string;
  name: string;
  birth_date?: string;
  top_work?: string;
  work_count: number;
}

export interface BookDetails extends Book {
    description?: string | { type: string, value: string };
    subjects?: string[];
    links?: { title: string, url: string }[];
    covers?: number[];
}

export interface AuthorDetails extends Author {
    bio?: string | { type: string, value: string };
    alternate_names?: string[];
    death_date?: string;
}


export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

export interface OpenLibraryAuthorSearchResponse {
  numFound: number;
  start: number;
  docs: Author[];
}

export interface SearchFilters {
  subject?: string;
  startYear?: string;
  endYear?: string;
  language?: string;
  minPages?: string;
  maxPages?: string;
}