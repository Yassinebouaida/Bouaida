import axios from 'axios';
import { User, Service, RegisterData, ServiceFormData, ServiceFilters } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// إضافة التوكن لكل طلب
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

// معالجة الاستجابات والأخطاء
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// خدمات المصادقة
export const authAPI = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: RegisterData): Promise<User> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

// خدمات الخدمات (Services)
export const servicesAPI = {
  createService: async (serviceData: ServiceFormData): Promise<Service> => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  getAvailableServices: async (filters?: ServiceFilters) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.city) params.append('city', filters.city);
    if (filters?.urgency) params.append('urgency', filters.urgency);
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());

    const response = await api.get(`/services/available?${params.toString()}`);
    return response.data;
  },

  getMyServices: async (page = 1, limit = 10) => {
    const response = await api.get(`/services/my-services?page=${page}&limit=${limit}`);
    return response.data;
  },

  getServiceById: async (id: string): Promise<Service> => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  submitOffer: async (serviceId: string, offer: {
    price: number;
    message: string;
    estimatedDuration: string;
  }): Promise<Service> => {
    const response = await api.post(`/services/${serviceId}/offer`, offer);
    return response.data;
  },

  acceptOffer: async (serviceId: string, craftsmanId: string): Promise<Service> => {
    const response = await api.post(`/services/${serviceId}/accept-offer`, { craftsmanId });
    return response.data;
  },

  updateServiceStatus: async (serviceId: string, status: string): Promise<Service> => {
    const response = await api.put(`/services/${serviceId}/status`, { status });
    return response.data;
  },

  submitReview: async (serviceId: string, review: {
    rating: number;
    comment: string;
  }): Promise<Service> => {
    const response = await api.post(`/services/${serviceId}/review`, review);
    return response.data;
  },
};

export default api;