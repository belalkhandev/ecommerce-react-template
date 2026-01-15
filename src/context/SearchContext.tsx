import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface SearchContextType {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isSearching: boolean;
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  recentSearches: string[];
  addRecentSearch: (term: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const allProducts: SearchResult[] = [
  { id: '1', name: 'Modern Leather Sofa', price: 899.00, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop', category: 'Living Room' },
  { id: '2', name: 'Scandinavian Armchair', price: 449.00, image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=100&h=100&fit=crop', category: 'Living Room' },
  { id: '3', name: 'Oak Coffee Table', price: 299.00, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&h=100&fit=crop', category: 'Living Room' },
  { id: '4', name: 'Industrial Floor Lamp', price: 189.00, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop', category: 'Lighting' },
  { id: '5', name: 'Minimalist Desk', price: 399.00, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=100&h=100&fit=crop', category: 'Office' },
  { id: '6', name: 'Velvet Dining Chair', price: 179.00, image: 'https://images.unsplash.com/photo-1506898667547-42e22a46e125?w=100&h=100&fit=crop', category: 'Dining' },
  { id: '7', name: 'King Size Bed Frame', price: 1299.00, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100&h=100&fit=crop', category: 'Bedroom' },
  { id: '8', name: 'Wooden Bookshelf', price: 349.00, image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=100&h=100&fit=crop', category: 'Storage' },
  { id: '9', name: 'Accent Rug', price: 129.00, image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=100&h=100&fit=crop', category: 'Decor' },
  { id: '10', name: 'Wall Mirror', price: 199.00, image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=100&h=100&fit=crop', category: 'Decor' },
  { id: '11', name: 'Plant Stand', price: 79.00, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop', category: 'Decor' },
  { id: '12', name: 'Bedside Table Set', price: 225.00, image: 'https://images.unsplash.com/photo-1499933374294-4584851497cc?w=100&h=100&fit=crop', category: 'Bedroom' },
];

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Sofa',
    'Dining Table',
    'Bedroom',
  ]);

  const handleSetQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    if (newQuery.trim().length > 0) {
      setIsSearching(true);
      setTimeout(() => {
        const filtered = allProducts.filter(
          product =>
            product.name.toLowerCase().includes(newQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(newQuery.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  }, []);

  const addRecentSearch = useCallback((term: string) => {
    if (term.trim()) {
      setRecentSearches(prev => {
        const filtered = prev.filter(s => s.toLowerCase() !== term.toLowerCase());
        return [term, ...filtered].slice(0, 5);
      });
    }
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery: handleSetQuery,
        results,
        isSearching,
        isOpen,
        openSearch,
        closeSearch,
        recentSearches,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
