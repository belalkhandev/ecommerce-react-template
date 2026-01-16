import api, { getCsrfCookie } from './api';
import type { LoginFormData, RegisterFormData } from '../types';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  emailVerifiedAt?: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token?: string;
}

export const authService = {
  async login(data: LoginFormData): Promise<AuthResponse> {
    await getCsrfCookie();
    const response = await api.post<AuthResponse>('/login', data);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterFormData): Promise<AuthResponse> {
    await getCsrfCookie();
    const response = await api.post<AuthResponse>('/register', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    await api.post('/logout');
    localStorage.removeItem('auth_token');
  },

  async getUser(): Promise<User> {
    const response = await api.get<User>('/user');
    return response.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    await getCsrfCookie();
    const response = await api.post<{ message: string }>('/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
  }): Promise<{ message: string }> {
    await getCsrfCookie();
    const response = await api.post<{ message: string }>('/reset-password', data);
    return response.data;
  },

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  }): Promise<User> {
    const response = await api.put<User>('/profile', {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
    });
    return response.data;
  },

  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<{ message: string }> {
    const response = await api.put<{ message: string }>('/password', {
      current_password: data.currentPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    });
    return response.data;
  },
};
