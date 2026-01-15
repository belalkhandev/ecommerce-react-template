import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/ProductCard';
import { ProductGridSkeleton } from '../../components/Skeleton';
import { products, categories, searchProducts, getProductsByCategory } from '../../data/products';
import type { Product } from '../../data/products';

type SortOption = 'default' | 'price-low' | 'price-high' | 'newest' | 'rating';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const sortParam = searchParams.get('sort') || '';

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (sortParam) {
      setSortBy(sortParam as SortOption);
    }
  }, [categoryParam, sortParam]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    if (searchQuery) {
      result = searchProducts(searchQuery);
    }

    if (selectedCategory && selectedCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (priceRange.length > 0) {
      result = result.filter(p => {
        return priceRange.some(range => {
          if (range === 'under-100') return p.price < 100;
          if (range === '100-500') return p.price >= 100 && p.price <= 500;
          if (range === '500-1000') return p.price >= 500 && p.price <= 1000;
          if (range === 'over-1000') return p.price > 1000;
          return true;
        });
      });
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result = result.filter(p => p.badge === 'new').concat(result.filter(p => p.badge !== 'new'));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category === 'All') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort);
    const params = new URLSearchParams(searchParams);
    if (sort === 'default') {
      params.delete('sort');
    } else {
      params.set('sort', sort);
    }
    setSearchParams(params);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setPriceRange([]);
    setSortBy('default');
    setSearchParams({});
  };

  const allCategories = ['All', ...categories.map(c => c.name)];

  const priceRanges = [
    { id: 'under-100', label: 'Under $100' },
    { id: '100-500', label: '$100 - $500' },
    { id: '500-1000', label: '$500 - $1000' },
    { id: 'over-1000', label: 'Over $1000' },
  ];

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
        <ul className="space-y-2">
          {allCategories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleCategoryChange(cat)}
                className={`text-sm transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-amber-600 font-medium'
                    : 'text-gray-600 hover:text-amber-600'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.id} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={priceRange.includes(range.id)}
                onChange={() => handlePriceRangeChange(range.id)}
                className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      {(selectedCategory !== 'All' || priceRange.length > 0 || searchQuery) && (
        <div className="border-t pt-6">
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Products</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory !== 'All' ? selectedCategory : 'All Products'}
          </h1>
          <p className="text-gray-600 mt-1">
            {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} results`}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-24 shadow-sm">
              <FilterSidebar />
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </button>
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                    aria-label="Grid view"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded cursor-pointer ${viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                    aria-label="List view"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-amber-500 focus:border-amber-500 bg-white"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="rating">Best Rating</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <ProductGridSkeleton count={12} />
            ) : filteredProducts.length > 0 ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${sortBy}-${searchQuery}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    viewMode === 'grid' ? (
                      <ProductCard key={product.id} {...product} />
                    ) : (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-sm p-4 flex gap-4"
                      >
                        <Link to={`/products/${product.id}`} className="shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/products/${product.id}`}
                            className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                          {product.rating && (
                            <div className="flex items-center gap-1 mt-2">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-3">
                            {product.originalPrice && (
                              <span className="text-gray-400 text-sm line-through">
                                ${product.originalPrice.toFixed(2)}
                              </span>
                            )}
                            <span className={`font-bold text-lg ${product.originalPrice ? 'text-green-600' : 'text-gray-900'}`}>
                              ${product.price.toFixed(2)}
                            </span>
                            {product.discount && (
                              <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                                -{product.discount}%
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}

            {filteredProducts.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center gap-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed" disabled>
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm cursor-pointer">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">2</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">3</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 cursor-pointer">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showMobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setShowMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;
