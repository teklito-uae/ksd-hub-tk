import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const getBaseURL = () => {
  if (import.meta.env.VITE_API_BASE_URL) return import.meta.env.VITE_API_BASE_URL;
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    // For production, use a relative path. The .htaccess will proxy this to the backend.
    return '/api/v1';
  }
  return 'http://localhost:8000/api/v1';
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// In-memory cache for GET requests
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method?.toLowerCase() === 'get') {
    const url = (config.url || '') + (config.params ? JSON.stringify(config.params) : '');
    const cached = cache.get(url);
    if (cached && cached.expiry > Date.now()) {
      config.adapter = async () => {
        return Promise.resolve({
          data: cached.data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
          request: {}
        } as AxiosResponse);
      };
    }
  }

  return config;
});

api.interceptors.response.use((response: AxiosResponse) => {
  if (response.config.method?.toLowerCase() === 'get') {
    const url = (response.config.url || '') + (response.config.params ? JSON.stringify(response.config.params) : '');
    cache.set(url, { data: response.data, expiry: Date.now() + CACHE_DURATION });
  }
  return response;
});

export default api;
