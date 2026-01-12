// Authentication Types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SocialAuthProvider {
  type: 'google' | 'apple' | 'facebook' | 'discord';
  token: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // Unix timestamp
  userId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  createdAt: string;
  lastLoginAt: string;
}

// Realm Types
export interface Realm {
  id: string;
  name: string;
  description: string;
  region: string;
  status: 'online' | 'offline' | 'maintenance';
  currentPopulation: number;
  maxPopulation: number;
  userCharacterCount: number;
  isPvP: boolean;
  createdAt: string;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  class: string;
  realmId: string;
  avatarUrl?: string;
  lastPlayedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Auth State Types
export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  token: AuthToken | null;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  GuestHome: undefined;
  Login: undefined;
  Register: undefined;
  RealmSelectHome: undefined;
  RealmDetail: { realmId: string };
};

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
