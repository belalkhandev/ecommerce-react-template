import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }

    if (error.response?.status === 419) {
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const getCsrfCookie = async () => {
  await axios.get('/sanctum/csrf-cookie', {
    baseURL: import.meta.env.VITE_APP_URL || '',
    withCredentials: true,
  });
};

export default api;
