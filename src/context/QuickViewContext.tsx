import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ProductCardProps } from '../components/ProductCard';

interface QuickViewContextType {
  product: ProductCardProps | null;
  isOpen: boolean;
  openQuickView: (product: ProductCardProps) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider = ({ children }: { children: ReactNode }) => {
  const [product, setProduct] = useState<ProductCardProps | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (product: ProductCardProps) => {
    setProduct(product);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setTimeout(() => setProduct(null), 200);
  };

  return (
    <QuickViewContext.Provider value={{ product, isOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};
