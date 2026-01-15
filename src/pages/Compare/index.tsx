import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCompare } from '../../context/CompareContext';
import { useCart } from '../../context/CartContext';

const Compare = () => {
  const { items, removeFromCompare, clearCompare, maxItems } = useCompare();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    });
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 py-8"
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900">Compare</span>
          </nav>

          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center max-w-lg mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No products to compare</h2>
            <p className="text-gray-500 mb-6">
              Add products to compare their features and prices side by side.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Browse Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-6 md:py-8"
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-900">Compare Products</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Compare Products
            </h1>
            <p className="text-gray-500 mt-1">
              {items.length} of {maxItems} products added
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left text-sm font-semibold text-gray-500 w-40">Product</th>
                  {items.map((item) => (
                    <th key={item.id} className="p-4 text-center min-w-[200px]">
                      <div className="relative">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                          aria-label="Remove from compare"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        <Link to={`/products/${item.id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-contain mx-auto mb-3"
                          />
                          <h3 className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                      </div>
                    </th>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <th key={`empty-${i}`} className="p-4 text-center min-w-[200px]">
                      <Link
                        to="/products"
                        className="block w-32 h-32 mx-auto mb-3 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </Link>
                      <span className="text-sm text-gray-400">Add Product</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Price Row */}
                <tr className="border-b bg-gray-50">
                  <td className="p-4 text-sm font-semibold text-gray-700">Price</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {item.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className={`text-lg font-bold ${item.originalPrice ? 'text-green-600' : 'text-gray-900'}`}>
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-price-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr className="border-b">
                  <td className="p-4 text-sm font-semibold text-gray-700">Rating</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      {item.rating ? (
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex">{renderStars(item.rating)}</div>
                          <span className="text-sm text-gray-500">
                            {item.rating} ({item.reviewCount || 0} reviews)
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400">No rating</span>
                      )}
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-rating-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>

                {/* Category Row */}
                <tr className="border-b bg-gray-50">
                  <td className="p-4 text-sm font-semibold text-gray-700">Category</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center text-gray-600">
                      {item.category}
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-cat-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>

                {/* Availability Row */}
                <tr className="border-b">
                  <td className="p-4 text-sm font-semibold text-gray-700">Availability</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                        item.inStock !== false
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.inStock !== false ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-stock-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>

                {/* Colors Row */}
                <tr className="border-b bg-gray-50">
                  <td className="p-4 text-sm font-semibold text-gray-700">Colors</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      {item.colors && item.colors.length > 0 ? (
                        <div className="flex justify-center gap-1">
                          {item.colors.map((color, i) => (
                            <span
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-colors-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>

                {/* Add to Cart Row */}
                <tr>
                  <td className="p-4 text-sm font-semibold text-gray-700">Action</td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-center">
                      <button
                        onClick={() => handleAddToCart(item)}
                        disabled={item.inStock === false}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                          isInCart(item.id)
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : item.inStock !== false
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                    </td>
                  ))}
                  {[...Array(maxItems - items.length)].map((_, i) => (
                    <td key={`empty-action-${i}`} className="p-4 text-center text-gray-300">—</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Compare;
