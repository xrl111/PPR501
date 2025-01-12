import axios from 'axios';
import { LoginData, LoginResponse, User } from '../types/index';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const login = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login/', data);
    const { refresh, access, username } = response.data;

    // Store tokens in local storage
    localStorage.setItem('refreshToken', refresh);
    localStorage.setItem('accessToken', access);
    localStorage.setItem('username', JSON.stringify(username));

    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh/', {
      refresh: refreshToken,
    });
    const { access } = response.data;

    // Update access token in local storage
    localStorage.setItem('accessToken', access);

    return access;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

export const logout = (): string => {
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('username');
  return 'OK';
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await apiClient.get('/auth/me/');
    return response.data;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getExams = async () => {
  try {
    const response = await apiClient.get('/exams/');
    return response.data;
  } catch (error) {
    console.error('Error getting exams:', error);
    throw error;
  }
};
