import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCompare } from '../../context/CompareContext';

export interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  badge?: 'hot' | 'sale' | 'new';
  discount?: number;
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  inStock?: boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const {
    id,
    name,
    category,
    price,
    originalPrice,
    image,
    hoverImage,
    badge,
    discount,
    rating,
    colors,
    inStock = true,
  } = props;

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors?.[0]);
  const [isAdding, setIsAdding] = useState(false);
  const { openQuickView } = useQuickView();
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();

  const isWishlisted = isInWishlist(id);
  const inCart = isInCart(id);
  const inCompare = isInCompare(id);

  const badgeStyles = {
    hot: 'bg-red-500',
    sale: 'bg-green-500',
    new: 'bg-blue-500',
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-3.5 h-3.5 ${i < Math.floor(rating) ? 'text-amber-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(props);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;

    setIsAdding(true);
    addToCart({
      id,
      name,
      price,
      originalPrice,
      image,
      color: selectedColor,
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id,
      name,
      price,
      originalPrice,
      image,
      inStock,
      rating,
      reviews: props.reviewCount,
    });
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare({
      id,
      name,
      price,
      originalPrice,
      image,
      category,
      rating,
      reviewCount: props.reviewCount,
      inStock,
      colors,
    });
  };

  return (
    <motion.div
      className="group relative bg-white rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link to={`/products/${id}`}>
          <img
            src={isHovered && hoverImage ? hoverImage : image}
            alt={name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {discount && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {badge && !discount && (
          <span className={`absolute top-3 left-3 ${badgeStyles[badge]} text-white text-xs font-bold px-3 py-1 rounded-full uppercase`}>
            {badge}
          </span>
        )}

        {!inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">Out of Stock</span>
          </div>
        )}

        <AnimatePresence>
          {isHovered && inStock && (
            <>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 flex flex-col gap-2"
              >
                <button
                  onClick={handleToggleCompare}
                  className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                    inCompare
                      ? 'bg-amber-500 text-white'
                      : 'bg-white hover:bg-amber-500 hover:text-white'
                  }`}
                  aria-label={inCompare ? 'Remove from Compare' : 'Add to Compare'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </button>
                <button
                  onClick={handleQuickView}
                  className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                  aria-label="Quick View"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-colors cursor-pointer ${
                    isWishlisted
                      ? 'bg-red-500 text-white'
                      : 'bg-white hover:bg-amber-500 hover:text-white'
                  }`}
                  aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  <svg
                    className="w-4 h-4"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-0 left-0 right-0 p-3"
              >
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-2.5 text-white text-sm font-semibold rounded transition-colors uppercase tracking-wide flex items-center justify-center gap-2 cursor-pointer ${
                    inCart
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isAdding ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : inCart ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4">
        {colors && colors.length > 0 && (
          <div className="flex gap-1.5 mb-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border-2 transition-all cursor-pointer ${
                  selectedColor === color ? 'border-gray-800 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                aria-label={`Select ${color} color`}
              />
            ))}
          </div>
        )}

        <Link to={`/products/${id}`}>
          <h3 className="text-gray-900 font-medium text-sm mb-1 hover:text-amber-600 transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>

        <p className="text-gray-500 text-xs mb-2">{category}</p>

        {rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            {renderStars(rating)}
          </div>
        )}

        <div className="flex items-center gap-2">
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">${originalPrice.toFixed(2)}</span>
          )}
          <span className={`font-semibold ${originalPrice ? 'text-green-600' : 'text-gray-900'}`}>
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
