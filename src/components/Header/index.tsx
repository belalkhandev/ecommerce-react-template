import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';
import SearchIcon from '../icons/SearchIcon';
import UserIcon from '../icons/UserIcon';
import CartIcon from '../icons/CartIcon';
import FavoriteIcon from '../icons/FavoriteIcon';

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <MobileMenu />
            <Logo />
          </div>

          <Navigation />

          <div className="flex items-center space-x-1 md:space-x-2">
            <SearchIcon />
            <span className="hidden md:inline-flex">
              <FavoriteIcon />
            </span>
            <span className="hidden md:inline-flex">
              <UserIcon />
            </span>
            <CartIcon />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
