import axios from 'axios';
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';

export const axiosApi = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApi.interceptors.request.use(
  config => {
    const token = Cookies.get('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh = Cookies.get('refresh');
        if (!refresh) throw new Error('Нет refresh токена');

        const { data } = await axios.post(`${BASE_URL}/api/v1/token/refresh/`, {
          refresh,
        });

        Cookies.set('access', data.access);
        axiosApi.defaults.headers.Authorization = `Bearer ${data.access}`;
        originalRequest.headers.Authorization = `Bearer ${data.access}`;

        return axiosApi(originalRequest);
      } catch (err) {
        Cookies.remove('access');
        Cookies.remove('refresh');
        Cookies.remove('role');
        Cookies.remove('login');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const axiosAuth = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
