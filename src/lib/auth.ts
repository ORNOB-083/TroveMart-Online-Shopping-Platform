// src/lib/auth.ts
import { api } from './api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  image?: string;
}

interface JwtPayload extends AuthUser {
  exp: number;
  iat: number;
}

const TOKEN_KEY = 'trovemart_token';

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getCurrentUser(): AuthUser | null {
  const token = getToken();
  if (!token) return null;

  try {
    const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }

    const { id, name, email, role, image } = payload;
    return { id, name, email, role, image };
  } catch {
    removeToken();
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

export async function login(email: string, password: string) {
  const { data } = await api.post('/auth/login', { email, password });
  setToken(data.token);
  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post('/auth/register', { name, email, password });
  setToken(data.token);
  return data;
}

export async function loginWithGoogle(idToken: string) {
  const { data } = await api.post('/auth/google', { idToken });
  setToken(data.token);
  return data;
}

export async function loginWithFacebookCode(code: string, redirectUri: string) {
  const { data } = await api.post('/auth/facebook', { code, redirectUri });
  setToken(data.token);
  return data;
}

export function logout() {
  removeToken();
}