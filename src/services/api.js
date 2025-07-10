import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers:{
   " x-api-key": "reqres-free-v1"
  }
});

export const authAPI = {
  login: (credentials) => api.post('/login', credentials),
};

export const userAPI = {
  getUsers: (page = 1) => api.get(`/users?page=${page}`),
  getUser: (id) => api.get(`/users/${id}`),
    updateUser: (id,formdata) => api.put(`/users/${id}`,formdata),
  deleteUser: (id) => api.delete(`/users/${id}`),
createUser: (userdata) => api.post(`/users`,userdata),
};

export default api;