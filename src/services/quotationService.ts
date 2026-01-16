import api from './api';
import type { Quotation, QuotationItem, QuotationFormData, QuotationStatus } from '../types';

export interface PaginatedQuotations {
  data: Quotation[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
}

export interface CreateQuotationData extends QuotationFormData {
  items: Omit<QuotationItem, 'id'>[];
}

export interface QuotationMessage {
  id: string;
  message: string;
  attachments?: File[];
}

export const quotationService = {
  async getQuotations(page?: number, status?: QuotationStatus): Promise<PaginatedQuotations> {
    const response = await api.get<PaginatedQuotations>('/quotations', {
      params: { page, status },
    });
    return response.data;
  },

  async getQuotation(id: string): Promise<Quotation> {
    const response = await api.get<Quotation>(`/quotations/${id}`);
    return response.data;
  },

  async createQuotation(data: CreateQuotationData): Promise<Quotation> {
    const response = await api.post<Quotation>('/quotations', {
      full_name: data.fullName,
      company_name: data.companyName,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      items: data.items.map(item => ({
        product_id: item.productId,
        name: item.name,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        specifications: item.specifications,
        is_custom: item.isCustom,
      })),
    });
    return response.data;
  },

  async updateQuotationStatus(id: string, status: QuotationStatus): Promise<Quotation> {
    const response = await api.put<Quotation>(`/quotations/${id}/status`, { status });
    return response.data;
  },

  async acceptQuotation(id: string): Promise<Quotation> {
    const response = await api.post<Quotation>(`/quotations/${id}/accept`);
    return response.data;
  },

  async rejectQuotation(id: string, reason?: string): Promise<Quotation> {
    const response = await api.post<Quotation>(`/quotations/${id}/reject`, { reason });
    return response.data;
  },

  async sendMessage(quotationId: string, message: string, attachments?: File[]): Promise<Quotation> {
    const formData = new FormData();
    formData.append('message', message);
    if (attachments) {
      attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }
    const response = await api.post<Quotation>(`/quotations/${quotationId}/messages`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  async convertToOrder(quotationId: string): Promise<{ orderId: string }> {
    const response = await api.post<{ orderId: string }>(`/quotations/${quotationId}/convert-to-order`);
    return response.data;
  },

  async downloadQuotationPdf(quotationId: string): Promise<Blob> {
    const response = await api.get(`/quotations/${quotationId}/pdf`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
