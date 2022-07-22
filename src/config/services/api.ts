import axios from 'axios';
import {API_URL} from 'react-native-dotenv';

const api = axios.create({baseURL: API_URL});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url !== '/auth/refresh' &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;
      await api.put('/auth/refresh');
      return api(originalRequest);
    }

    return Promise.reject(error);
  },
);

export default api;
