import axios from 'axios';
import { BASE_URL } from './constants';

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access')}`,
    // Accept: 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${localStorage.getItem('access')}`,
    // Accept: 'application/json',
  },
});
