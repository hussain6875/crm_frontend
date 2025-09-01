// Base URL for your backend API
export const API_BASE_URL = "http://localhost:8080/api";

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
};

