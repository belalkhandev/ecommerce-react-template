export type QuotationStatus =
  | 'draft'
  | 'pending'
  | 'under_review'
  | 'quoted'
  | 'accepted'
  | 'rejected'
  | 'expired';

export interface QuotationItem {
  id: string;
  productId?: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  estimatedPrice?: number;
  finalPrice?: number;
  image?: string;
  isCustom: boolean;
  specifications?: string;
}

export interface QuotationMessage {
  id: string;
  senderId: string;
  senderType: 'user' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  userId: string;
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  items: QuotationItem[];
  status: QuotationStatus;
  notes?: string;
  adminResponse?: string;
  totalEstimated?: number;
  totalQuoted?: number;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
  messages: QuotationMessage[];
}

export interface QuotationFormData {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  notes: string;
}

export interface NewQuotationItem {
  name: string;
  description: string;
  quantity: number;
  unit: string;
  specifications: string;
}

export const QUOTATION_STATUS_CONFIG: Record<QuotationStatus, { label: string; color: string; bgColor: string }> = {
  draft: { label: 'Draft', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  pending: { label: 'Pending Review', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  under_review: { label: 'Under Review', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  quoted: { label: 'Quoted', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  accepted: { label: 'Accepted', color: 'text-green-600', bgColor: 'bg-green-100' },
  rejected: { label: 'Rejected', color: 'text-red-600', bgColor: 'bg-red-100' },
  expired: { label: 'Expired', color: 'text-gray-500', bgColor: 'bg-gray-100' },
};

export const UNIT_OPTIONS = [
  'pieces',
  'sets',
  'units',
  'boxes',
  'pallets',
  'square feet',
  'linear feet',
  'custom',
];
