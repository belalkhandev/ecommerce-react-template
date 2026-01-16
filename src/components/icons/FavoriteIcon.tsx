import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';

const FavoriteIcon: FC = () => {
  const { totalItems } = useWishlist();

  return (
    <Link to="/wishlist" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Favorites">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
};

export default FavoriteIcon;
