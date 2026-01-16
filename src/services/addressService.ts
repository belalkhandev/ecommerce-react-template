import api from './api';
import type { AddressFormData } from '../types';

export interface Address extends AddressFormData {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const addressService = {
  async getAddresses(): Promise<Address[]> {
    const response = await api.get<Address[]>('/addresses');
    return response.data;
  },

  async getAddress(id: string): Promise<Address> {
    const response = await api.get<Address>(`/addresses/${id}`);
    return response.data;
  },

  async createAddress(data: AddressFormData): Promise<Address> {
    const response = await api.post<Address>('/addresses', {
      label: data.label,
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      phone: data.phone,
      is_default: data.isDefault,
    });
    return response.data;
  },

  async updateAddress(id: string, data: AddressFormData): Promise<Address> {
    const response = await api.put<Address>(`/addresses/${id}`, {
      label: data.label,
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      apartment: data.apartment,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      phone: data.phone,
      is_default: data.isDefault,
    });
    return response.data;
  },

  async deleteAddress(id: string): Promise<void> {
    await api.delete(`/addresses/${id}`);
  },

  async setDefaultAddress(id: string): Promise<Address> {
    const response = await api.post<Address>(`/addresses/${id}/set-default`);
    return response.data;
  },
};
