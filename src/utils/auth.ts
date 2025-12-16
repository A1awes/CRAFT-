import { User } from '../types';
import { mockUsers } from '../data/mockData';

const AUTH_STORAGE_KEY = 'stroycontrol_auth';

export interface AuthData {
  user: User;
  token: string;
  expiresAt: number;
}

export const saveAuthData = (authData: AuthData): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
};

export const getAuthData = (): AuthData | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) return null;
  
  try {
    const authData: AuthData = JSON.parse(stored);
    if (Date.now() > authData.expiresAt) {
      clearAuthData();
      return null;
    }
    return authData;
  } catch {
    clearAuthData();
    return null;
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const mockLogin = async (email: string, password: string): Promise<AuthData> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock authentication logic
  const user = mockUsers.find(u => u.email === email);
  
  if (!user || password !== 'demo123') {
    throw new Error('Неверный email или пароль');
  }
  
  const authData: AuthData = {
    user,
    token: `mock_token_${user.id}_${Date.now()}`,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  saveAuthData(authData);
  return authData;
};

export const mockDemoLogin = async (role: string): Promise<AuthData> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(u => u.role === role);
  if (!user) {
    throw new Error('Пользователь не найден');
  }
  
  const authData: AuthData = {
    user,
    token: `demo_token_${user.id}_${Date.now()}`,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000)
  };
  
  saveAuthData(authData);
  return authData;
};

export const mockRegister = async (userData: {
  name: string;
  email: string;
  password: string;
  role: User['role'];
}): Promise<AuthData> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Check if user already exists
  if (mockUsers.some(u => u.email === userData.email)) {
    throw new Error('Пользователь с таким email уже существует');
  }
  
  const newUser: User = {
    id: Math.max(...mockUsers.map(u => u.id)) + 1,
    name: userData.name,
    email: userData.email,
    role: userData.role,
    avatar: `https://images.pexels.com/photos/${Math.floor(Math.random() * 9000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 9000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150`
  };
  
  mockUsers.push(newUser);
  
  const authData: AuthData = {
    user: newUser,
    token: `mock_token_${newUser.id}_${Date.now()}`,
    expiresAt: Date.now() + (24 * 60 * 60 * 1000)
  };
  
  saveAuthData(authData);
  return authData;
};

export const mockForgotPassword = async (email: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const user = mockUsers.find(u => u.email === email);
  if (!user) {
    throw new Error('Пользователь с таким email не найден');
  }
  
  // Simulate sending email
  console.log(`Password reset email sent to ${email}`);
};