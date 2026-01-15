import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '../../../components/DashboardLayout';
import { useWishlist } from '../../../context/WishlistContext';
import { useCart } from '../../../context/CartContext';

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist, totalItems } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item: typeof items[0]) => {
    if (!item.inStock) return;
    setAddingToCart(item.id);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
    });
    setTimeout(() => setAddingToCart(null), 500);
  };

  const handleAddAllToCart = () => {
    items.filter(i => i.inStock && !isInCart(i.id)).forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
      });
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStars = (rating: number = 0) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-sm text-gray-500 ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <DashboardLayout title="My Wishlist" subtitle={`${totalItems} items saved`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {items.length > 0 ? (
          <>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">{totalItems}</span> items in your wishlist
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleAddAllToCart}
                  className="px-4 py-2 text-sm font-medium text-white bg-amber-500 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={clearWishlist}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {items.map((item) => {
                  const inCart = isInCart(item.id);
                  const isAdding = addingToCart === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden group"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {item.originalPrice && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                              -{Math.round((1 - item.price / item.originalPrice) * 100)}%
                            </span>
                          )}
                          {!item.inStock && (
                            <span className="px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded">
                              Out of Stock
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleRemove(item.id)}
                          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4">
                        <Link
                          to={`/products/${item.id}`}
                          className="font-medium text-gray-900 hover:text-amber-600 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>

                        {item.rating !== undefined && (
                          <div className="mt-2">
                            {renderStars(item.rating)}
                            {item.reviews !== undefined && (
                              <span className="text-xs text-gray-500 mt-1">({item.reviews} reviews)</span>
                            )}
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock || isAdding}
                          className={`w-full mt-4 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                            !item.inStock
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : inCart
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-amber-500 hover:bg-amber-600 text-white'
                          }`}
                        >
                          {isAdding ? (
                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              {inCart ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              )}
                            </svg>
                          )}
                          {!item.inStock ? 'Out of Stock' : inCart ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Save your favorite items here so you can easily find them later. Start exploring our collection!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              Explore Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        )}

        {items.length > 0 && (
          <motion.div variants={itemVariants} className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  id: 'r1',
                  name: 'Wooden Bookshelf',
                  price: 349.00,
                  image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=200&h=200&fit=crop',
                },
                {
                  id: 'r2',
                  name: 'Accent Rug',
                  price: 129.00,
                  image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=200&h=200&fit=crop',
                },
                {
                  id: 'r3',
                  name: 'Wall Mirror',
                  price: 199.00,
                  image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=200&h=200&fit=crop',
                },
                {
                  id: 'r4',
                  name: 'Plant Stand',
                  price: 79.00,
                  image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop',
                },
              ].map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                    <p className="text-amber-600 font-semibold text-sm mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Wishlist;
