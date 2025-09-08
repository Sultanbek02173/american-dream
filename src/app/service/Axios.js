import axios from 'axios'
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';

const axiosApi = axios.create({
  baseURL: `${BASE_URL}/api/v1/`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosApi.interceptors.request.use(
  config => {
    const token = Cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export { axiosApi };
