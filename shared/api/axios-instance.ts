import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://172.86.116.116:8002';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || error.response.data?.detail || 'خطایی رخ داد';
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(new Error('خطا در ارتباط با سرور'));
    }
    return Promise.reject(error);
  }
);


