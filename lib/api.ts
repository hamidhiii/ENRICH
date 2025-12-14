import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem('token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// API endpoints
export const authAPI = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/api/auth/login', credentials),
  register: (userData: any) => api.post('/api/auth/register', userData),
  getCurrentUser: () => api.get('/api/auth/me'),
};

export const productsAPI = {
  getAll: (params?: any) => api.get('/api/products', { params }),
  getById: (id: number) => api.get(`/api/products/${id}`),
  create: (data: any) => api.post('/api/products', data),
  update: (id: number, data: any) => api.put(`/api/products/${id}`, data),
  delete: (id: number) => api.delete(`/api/products/${id}`),
};

export const categoriesAPI = {
  getAll: (params?: any) => api.get('/api/categories', { params }),
  getById: (id: number) => api.get(`/api/categories/${id}`),
  create: (data: any) => api.post('/api/categories', data),
  update: (id: number, data: any) => api.put(`/api/categories/${id}`, data),
  delete: (id: number) => api.delete(`/api/categories/${id}`),
};

export const newsAPI = {
  getAll: (params?: any) => api.get('/api/news', { params }),
  getById: (id: number) => api.get(`/api/news/${id}`),
  create: (data: any) => api.post('/api/news', data),
  update: (id: number, data: any) => api.put(`/api/news/${id}`, data),
  delete: (id: number) => api.delete(`/api/news/${id}`),
};

export const contactAPI = {
  submit: (data: any) => api.post('/api/contact', data),
  getAll: (params?: any) => api.get('/api/contact', { params }),
  update: (id: number, data: any) => api.put(`/api/contact/${id}`, data),
};

export const uploadAPI = {
  image: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  pdf: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/upload/pdf', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
