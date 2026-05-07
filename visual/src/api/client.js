import axios from "axios";

const api = axios.create({
  // Uses your Vercel environment variable in production, falls back to 5001 locally
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vv_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
