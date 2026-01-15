import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNavigation from '../components/BottomNavigation';
import QuickViewModal from '../components/QuickViewModal';
import SearchModal from '../components/SearchModal';
import { QuickViewProvider, useQuickView } from '../context/QuickViewContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';
import { CompareProvider } from '../context/CompareContext';
import { SearchProvider } from '../context/SearchContext';

const MainLayoutContent = () => {
  const { product, isOpen, closeQuickView } = useQuickView();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNavigation />
      <QuickViewModal product={product} isOpen={isOpen} onClose={closeQuickView} />
      <SearchModal />
    </div>
  );
};

const MainLayout = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          <SearchProvider>
            <QuickViewProvider>
              <MainLayoutContent />
            </QuickViewProvider>
          </SearchProvider>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
};

export default MainLayout;
