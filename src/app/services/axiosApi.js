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

export const axiosAuth = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});
