// src/services/axiosClient.js
import axios from 'axios';
import { BASE_API_URL } from './api';

// Tạo instance của axios
const axiosClient = axios.create({
  baseURL: `${BASE_API_URL}`, // URL gốc
  timeout: 1000, // Thời gian timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor cho request
axiosClient.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor cho response
axiosClient.interceptors.response.use(
  (response) => {
    return response; // Trả về dữ liệu gốc
  },
  (error) => {
    console.error(error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
