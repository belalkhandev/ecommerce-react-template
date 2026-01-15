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
import { QuotationProvider } from '../context/QuotationContext';
import useScrollToTop from '../hooks/useScrollToTop';

const MainLayoutContent = () => {
  const { product, isOpen, closeQuickView } = useQuickView();
  useScrollToTop();

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
            <QuotationProvider>
              <QuickViewProvider>
                <MainLayoutContent />
              </QuickViewProvider>
            </QuotationProvider>
          </SearchProvider>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
};

export default MainLayout;
