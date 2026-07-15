import { api } from './api';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'seller' | 'admin';
  image?: string;
  createdAt?: string | Date;
}

interface JwtPayload extends AuthUser {
  exp: number;
  iat: number;
}

const TOKEN_KEY = 'trovemart_token';
const USER_KEY = 'trovemart_user';
const AUTH_CHANGE_EVENT = 'trovemart:auth-change';

function emitAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
  }
}

export function setToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  emitAuthChange();
}

export function setCurrentUser(user: AuthUser) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  emitAuthChange();
}

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  emitAuthChange();
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  const token = getToken();
  if (!token) {
    localStorage.removeItem(USER_KEY);
    return null;
  }

  const cachedUser = localStorage.getItem(USER_KEY);
  if (cachedUser) {
    try {
      return JSON.parse(cachedUser) as AuthUser;
    } catch {
      localStorage.removeItem(USER_KEY);
    }
  }

  try {
    const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp * 1000 < Date.now()) {
      removeToken();
      return null;
    }

    const { id, name, email, role, image, createdAt } = payload;
    const user = { id, name, email, role, image, createdAt };
    setCurrentUser(user);
    return user;
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
  if (data.user) {
    setCurrentUser(data.user);
  }
  // Sync cart with server after login
  const { hydrateCartFromServer } = await import('./cart');
  await hydrateCartFromServer();
  return data;
}

export async function register(name: string, email: string, password: string) {
  const { data } = await api.post('/auth/register', { name, email, password });
  setToken(data.token);
  if (data.user) {
    setCurrentUser(data.user);
  }
  // Sync cart with server after registration
  const { hydrateCartFromServer } = await import('./cart');
  await hydrateCartFromServer();
  return data;
}

export async function loginWithGoogle(idToken: string) {
  const { data } = await api.post('/auth/google', { idToken });
  setToken(data.token);
  if (data.user) {
    setCurrentUser(data.user);
  }
  // Sync cart with server after login
  const { hydrateCartFromServer } = await import('./cart');
  await hydrateCartFromServer();
  return data;
}

export async function loginWithFacebookCode(code: string, redirectUri: string) {
  const { data } = await api.post('/auth/facebook', { code, redirectUri });
  setToken(data.token);
  if (data.user) {
    setCurrentUser(data.user);
  }
  // Sync cart with server after login
  const { hydrateCartFromServer } = await import('./cart');
  await hydrateCartFromServer();
  return data;
}

export function logout() {
  removeToken();
}

export async function refreshSession(): Promise<AuthUser | null> {
  try {
    const { data } = await api.get('/auth/refresh');
    setToken(data.token);
    return data.user;
  } catch {
    return null;
  }
}