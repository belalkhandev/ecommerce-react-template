import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface CompareItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  colors?: string[];
  description?: string;
}

interface CompareContextType {
  items: CompareItem[];
  addToCompare: (item: CompareItem) => boolean;
  removeFromCompare: (id: string) => void;
  toggleCompare: (item: CompareItem) => boolean;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  totalItems: number;
  maxItems: number;
  canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export const CompareProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CompareItem[]>([]);

  const addToCompare = useCallback((item: CompareItem): boolean => {
    let added = false;
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      added = true;
      return [...prev, item];
    });
    return added;
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const toggleCompare = useCallback((item: CompareItem): boolean => {
    let added = false;
    setItems(prev => {
      if (prev.some(i => i.id === item.id)) {
        return prev.filter(i => i.id !== item.id);
      }
      if (prev.length >= MAX_COMPARE_ITEMS) return prev;
      added = true;
      return [...prev, item];
    });
    return added;
  }, []);

  const isInCompare = useCallback((id: string) => {
    return items.some(item => item.id === id);
  }, [items]);

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.length;
  const canAddMore = items.length < MAX_COMPARE_ITEMS;

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        toggleCompare,
        isInCompare,
        clearCompare,
        totalItems,
        maxItems: MAX_COMPARE_ITEMS,
        canAddMore,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
