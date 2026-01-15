import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type {
  Quotation,
  QuotationItem,
  QuotationFormData,
  QuotationStatus,
} from '../types';

interface QuotationContextType {
  quotations: Quotation[];
  currentQuotation: Quotation | null;
  draftItems: QuotationItem[];
  addDraftItem: (item: QuotationItem) => void;
  removeDraftItem: (id: string) => void;
  updateDraftItem: (id: string, updates: Partial<QuotationItem>) => void;
  clearDraftItems: () => void;
  createQuotation: (formData: QuotationFormData) => Quotation;
  getQuotationById: (id: string) => Quotation | undefined;
  updateQuotationStatus: (id: string, status: QuotationStatus) => void;
  totalDraftItems: number;
}

const QuotationContext = createContext<QuotationContextType | undefined>(undefined);

const generateQuotationNumber = (): string => {
  const prefix = 'QT';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: '1',
    quotationNumber: 'QT-LX8K2M-A7BC',
    userId: 'user-1',
    fullName: 'John Doe',
    companyName: 'Acme Corporation',
    email: 'john@acme.com',
    phone: '+1 234 567 8900',
    items: [
      {
        id: 'item-1',
        productId: '1',
        name: 'Modern Leather Sofa',
        description: 'Luxurious leather sofa for office lobby',
        quantity: 5,
        unit: 'pieces',
        estimatedPrice: 899,
        finalPrice: 850,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
        isCustom: false,
      },
      {
        id: 'item-2',
        name: 'Custom Reception Desk',
        description: 'L-shaped reception desk with marble top',
        quantity: 1,
        unit: 'pieces',
        estimatedPrice: 2500,
        finalPrice: 2400,
        isCustom: true,
        specifications: 'Dimensions: 8ft x 4ft, White marble top, Oak wood base',
      },
    ],
    status: 'quoted',
    notes: 'Need delivery within 2 weeks. Installation required.',
    adminResponse: 'We can deliver within the requested timeframe. Installation is included.',
    totalEstimated: 6995,
    totalQuoted: 6650,
    validUntil: '2026-02-15',
    createdAt: '2026-01-10T10:30:00Z',
    updatedAt: '2026-01-12T14:20:00Z',
    messages: [
      {
        id: 'msg-1',
        senderId: 'admin-1',
        senderType: 'admin',
        senderName: 'Sales Team',
        message: 'Thank you for your quotation request. We have reviewed your requirements and prepared the pricing.',
        timestamp: '2026-01-12T14:20:00Z',
      },
    ],
  },
  {
    id: '2',
    quotationNumber: 'QT-MN3P5R-X9YZ',
    userId: 'user-1',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 234 567 8900',
    items: [
      {
        id: 'item-3',
        productId: '7',
        name: 'King Size Bed Frame',
        description: 'Bed frame for master bedroom',
        quantity: 1,
        unit: 'pieces',
        estimatedPrice: 1299,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=200&h=200&fit=crop',
        isCustom: false,
      },
    ],
    status: 'pending',
    notes: 'Looking for bulk discount if I order matching nightstands.',
    createdAt: '2026-01-14T09:15:00Z',
    updatedAt: '2026-01-14T09:15:00Z',
    messages: [],
  },
];

export const QuotationProvider = ({ children }: { children: ReactNode }) => {
  const [quotations, setQuotations] = useState<Quotation[]>(MOCK_QUOTATIONS);
  const [currentQuotation, setCurrentQuotation] = useState<Quotation | null>(null);
  const [draftItems, setDraftItems] = useState<QuotationItem[]>([]);

  const addDraftItem = useCallback((item: QuotationItem) => {
    setDraftItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
  }, []);

  const removeDraftItem = useCallback((id: string) => {
    setDraftItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateDraftItem = useCallback((id: string, updates: Partial<QuotationItem>) => {
    setDraftItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  }, []);

  const clearDraftItems = useCallback(() => {
    setDraftItems([]);
  }, []);

  const createQuotation = useCallback((formData: QuotationFormData): Quotation => {
    const newQuotation: Quotation = {
      id: generateId(),
      quotationNumber: generateQuotationNumber(),
      userId: 'user-1',
      fullName: formData.fullName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      items: [...draftItems],
      status: 'pending',
      notes: formData.notes,
      totalEstimated: draftItems.reduce((sum, item) => sum + (item.estimatedPrice || 0) * item.quantity, 0),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };

    setQuotations(prev => [newQuotation, ...prev]);
    setCurrentQuotation(newQuotation);
    setDraftItems([]);

    return newQuotation;
  }, [draftItems]);

  const getQuotationById = useCallback((id: string): Quotation | undefined => {
    return quotations.find(q => q.id === id);
  }, [quotations]);

  const updateQuotationStatus = useCallback((id: string, status: QuotationStatus) => {
    setQuotations(prev => prev.map(q => q.id === id ? { ...q, status, updatedAt: new Date().toISOString() } : q));
  }, []);

  const totalDraftItems = draftItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <QuotationContext.Provider
      value={{
        quotations,
        currentQuotation,
        draftItems,
        addDraftItem,
        removeDraftItem,
        updateDraftItem,
        clearDraftItems,
        createQuotation,
        getQuotationById,
        updateQuotationStatus,
        totalDraftItems,
      }}
    >
      {children}
    </QuotationContext.Provider>
  );
};

export const useQuotation = () => {
  const context = useContext(QuotationContext);
  if (!context) {
    throw new Error('useQuotation must be used within a QuotationProvider');
  }
  return context;
};
