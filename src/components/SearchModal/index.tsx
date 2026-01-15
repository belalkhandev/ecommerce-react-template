import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../../context/SearchContext';
import { SearchResultSkeleton } from '../Skeleton';

const SearchModal = () => {
  const {
    query,
    setQuery,
    results,
    isSearching,
    isOpen,
    closeSearch,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeSearch]);

  const handleResultClick = (productName: string) => {
    addRecentSearch(productName);
    closeSearch();
  };

  const popularCategories = [
    { name: 'Living Room', icon: '🛋️' },
    { name: 'Bedroom', icon: '🛏️' },
    { name: 'Dining', icon: '🍽️' },
    { name: 'Office', icon: '💼' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white shadow-xl max-h-[80vh] overflow-hidden"
          >
            <div className="max-w-3xl mx-auto p-4">
              <div className="relative">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for furniture, decor, and more..."
                  className="w-full pl-12 pr-12 py-4 text-lg border-b border-gray-200 focus:outline-none focus:border-amber-500"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-12 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {isSearching ? (
                  <SearchResultSkeleton />
                ) : query ? (
                  results.length > 0 ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-500 mb-3">
                        {results.length} results for "{query}"
                      </p>
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/${product.id}`}
                          onClick={() => handleResultClick(product.name)}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-sm text-gray-500">{product.category}</p>
                          </div>
                          <p className="font-semibold text-amber-600">
                            ${product.price.toFixed(2)}
                          </p>
                        </Link>
                      ))}
                      <Link
                        to={`/products?search=${encodeURIComponent(query)}`}
                        onClick={closeSearch}
                        className="block text-center py-3 text-amber-600 hover:text-amber-700 font-medium"
                      >
                        View all results
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <p className="text-gray-900 font-medium mb-1">No results found</p>
                      <p className="text-gray-500 text-sm">
                        Try searching for something else
                      </p>
                    </div>
                  )
                ) : (
                  <div className="space-y-6">
                    {recentSearches.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-gray-900">Recent Searches</h3>
                          <button
                            onClick={clearRecentSearches}
                            className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {recentSearches.map((term, i) => (
                            <button
                              key={i}
                              onClick={() => setQuery(term)}
                              className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Popular Categories</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {popularCategories.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => setQuery(category.name)}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <span className="text-2xl">{category.icon}</span>
                            <span className="font-medium text-gray-700">{category.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Trending Products</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          { id: '1', name: 'Modern Leather Sofa', price: 899, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop' },
                          { id: '3', name: 'Oak Coffee Table', price: 299, image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=100&h=100&fit=crop' },
                          { id: '7', name: 'King Size Bed', price: 1299, image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=100&h=100&fit=crop' },
                        ].map((product) => (
                          <Link
                            key={product.id}
                            to={`/products/${product.id}`}
                            onClick={() => handleResultClick(product.name)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                              <p className="text-sm text-amber-600">${product.price}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
