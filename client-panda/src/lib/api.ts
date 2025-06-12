import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
});

export default api;