import axios from 'axios';

export let API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
if (API_URL && !API_URL.startsWith('http')) {
  API_URL = `http://${API_URL}`;
}

export const getImageUrl = (path: string | null | undefined) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Types and Interfaces
export interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export interface Category {
  id: number;
  name_ru: string;
  name_uz: string;
  name_en?: string;
  slug: string;
  description_ru?: string;
  description_uz?: string;
  description_en?: string;
  icon?: string;
  order: number;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  category_id: number;
  name_ru: string;
  name_uz: string;
  name_en?: string;
  slug?: string;
  form: string;
  instructions_ru?: string;
  instructions_uz?: string;
  instructions_en?: string;
  composition_ru?: string;
  composition_uz?: string;
  composition_en?: string;
  storage_conditions_ru?: string;
  storage_conditions_uz?: string;
  storage_conditions_en?: string;
  side_effects_ru?: string;
  side_effects_uz?: string;
  side_effects_en?: string;
  image?: string;
  pdf_file?: string;
  is_active: boolean;
  featured: boolean;
  created_at: string;
  category?: Category;
}

export interface News {
  id: number;
  title_ru: string;
  title_uz: string;
  title_en?: string;
  slug: string;
  excerpt_ru?: string;
  excerpt_uz?: string;
  excerpt_en?: string;
  content_ru: string;
  content_uz: string;
  content_en?: string;
  image?: string;
  published_date?: string;
  is_published: boolean;
  views: number;
  created_at: string;
}

export interface Certificate {
  id: number;
  name_ru: string;
  name_uz: string;
  name_en?: string;
  description_ru?: string;
  description_uz?: string;
  description_en?: string;
  certificate_type?: string;
  image?: string;
  pdf_file?: string;
  issue_date?: string;
  expiry_date?: string;
  is_active: boolean;
  order: number;
  created_at: string;
}

export interface Partner {
  id: number;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  address?: string;
  message?: string;
  status: string;
  notes?: string;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  full_name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: string;
  notes?: string;
  created_at: string;
}

export interface PageSection {
  id: number;
  page_path: string;
  section_key: string;
  title_uz?: string;
  title_ru?: string;
  title_en?: string;
  subtitle_uz?: string;
  subtitle_ru?: string;
  subtitle_en?: string;
  content_uz?: string;
  content_ru?: string;
  content_en?: string;
  image?: string;
  background_image?: string;
  video_url?: string;
  button_text_uz?: string;
  button_text_ru?: string;
  button_text_en?: string;
  button_link?: string;
  order: number;
  is_active: boolean;
  updated_at?: string;
}

export interface AuditLog {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: string;
  details?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  user?: {
    username: string;
    full_name?: string;
  };
}

export interface SiteSettings {
  id: number;
  site_name_ru?: string;
  site_name_uz?: string;
  site_name_en?: string;
  logo?: string;
  favicon?: string;
  email?: string;
  phone?: string;
  address_ru?: string;
  address_uz?: string;
  address_en?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
  telegram_url?: string;
  meta_title_ru?: string;
  meta_title_uz?: string;
  meta_title_en?: string;
  meta_description_ru?: string;
  meta_description_uz?: string;
  meta_description_en?: string;
  google_maps_embed?: string;
  google_analytics_id?: string;
  updated_at?: string;
}

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
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        if (window.location.pathname.startsWith('/admin')) {
          window.location.href = '/admin/login';
        }
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
  register: (userData: Record<string, unknown>) => api.post('/api/auth/register', userData),
  getCurrentUser: () => api.get('/api/auth/me'),
};

export const productsAPI = {
  getAll: (params?: QueryParams) => api.get('/api/products/', { params }),
  getById: (id: number) => api.get(`/api/products/${id}`),
  getBySlug: (slug: string) => api.get(`/api/products/slug/${slug}`),
  create: (data: Partial<Product>) => api.post('/api/products/', data),
  update: (id: number, data: Partial<Product>) => api.put(`/api/products/${id}`, data),
  delete: (id: number) => api.delete(`/api/products/${id}`),
};

export const categoriesAPI = {
  getAll: (params?: QueryParams) => api.get('/api/categories/', { params }),
  getById: (id: number) => api.get(`/api/categories/${id}`),
  create: (data: Partial<Category>) => api.post('/api/categories/', data),
  update: (id: number, data: Partial<Category>) => api.put(`/api/categories/${id}`, data),
  delete: (id: number) => api.delete(`/api/categories/${id}`),
};

export const newsAPI = {
  getAll: (params?: QueryParams) => api.get('/api/news/', { params }),
  getById: (id: number) => api.get(`/api/news/${id}`),
  create: (data: Partial<News>) => api.post('/api/news/', data),
  update: (id: number, data: Partial<News>) => api.put(`/api/news/${id}`, data),
  delete: (id: number) => api.delete(`/api/news/${id}`),
};

export const contactAPI = {
  submit: (data: Partial<ContactMessage>) => api.post('/api/contact/', data),
  getAll: (params?: QueryParams) => api.get('/api/contact/', { params }),
  update: (id: number, data: Partial<ContactMessage>) => api.put(`/api/contact/${id}`, data),
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

export const certificatesAPI = {
  getAll: (params?: QueryParams) => api.get('/api/certificates/', { params }),
  getById: (id: number) => api.get(`/api/certificates/${id}`),
  create: (data: Partial<Certificate>) => api.post('/api/certificates/', data),
  update: (id: number, data: Partial<Certificate>) => api.put(`/api/certificates/${id}`, data),
  delete: (id: number) => api.delete(`/api/certificates/${id}`),
};

export const partnersAPI = {
  getAll: (params?: QueryParams) => api.get('/api/partners/', { params }),
  getById: (id: number) => api.get(`/api/partners/${id}`),
  create: (data: Partial<Partner>) => api.post('/api/partners/', data),
  update: (id: number, data: Partial<Partner>) => api.put(`/api/partners/${id}`, data),
  delete: (id: number) => api.delete(`/api/partners/${id}`),
};

export const contentAPI = {
  getSections: (params?: { page_path?: string; is_active?: boolean }) =>
    api.get('/api/content/sections', { params }),
  getSectionById: (id: number) => api.get(`/api/content/sections/${id}`),
  createSection: (data: Partial<PageSection>) => api.post('/api/content/sections', data),
  updateSection: (id: number, data: Partial<PageSection>) => api.put(`/api/content/sections/${id}`, data),
  deleteSection: (id: number) => api.delete(`/api/content/sections/${id}`),
};

export interface SiteSettings {
  id: number;
  site_name_ru?: string;
  site_name_uz?: string;
  site_name_en?: string;
  logo?: string;
  favicon?: string;
  email?: string;
  phone?: string;
  address_ru?: string;
  address_uz?: string;
  address_en?: string;
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  linkedin_url?: string;
  telegram_url?: string;
  meta_title_ru?: string;
  meta_title_uz?: string;
  meta_title_en?: string;
  meta_description_ru?: string;
  meta_description_uz?: string;
  meta_description_en?: string;
  google_maps_embed?: string;
  google_analytics_id?: string;
}

export const settingsAPI = {
  get: () => api.get<SiteSettings>('/api/settings'),
  update: (data: Partial<SiteSettings>) => api.put<SiteSettings>('/api/settings', data),
};

export const statsAPI = {
  get: () => api.get('/api/stats'),
};

export const auditLogsAPI = {
  getAll: (params?: { limit?: number; offset?: number; entity_type?: string }) =>
    api.get('/api/audit-logs', { params }),
};

export const backupAPI = {
  create: () => api.post('/api/backup/create'),
  download: async () => {
    try {
      const response = await api.get('/api/backup/download', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `enrich_backup_${new Date().toISOString().split('T')[0]}.db`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
  },
};
