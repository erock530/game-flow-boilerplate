import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  AuthState,
  AuthStatus,
  User,
  AuthCredentials,
  SocialAuthProvider,
} from '../types';
import { authService } from '../services';

// Action Types
type AuthAction =
  | { type: 'SET_LOADING' }
  | { type: 'SET_AUTHENTICATED'; payload: { user: User } }
  | { type: 'SET_UNAUTHENTICATED' }
  | { type: 'UPDATE_USER'; payload: { user: User } };

// Initial State
const initialState: AuthState = {
  status: 'loading',
  user: null,
  token: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        status: 'loading',
      };
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user,
      };
    case 'SET_UNAUTHENTICATED':
      return {
        ...state,
        status: 'unauthenticated',
        user: null,
        token: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

// Context Types
interface AuthContextType {
  state: AuthState;
  checkAuth: () => Promise<boolean>;
  login: (
    credentials: AuthCredentials
  ) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  socialLogin: (
    provider: SocialAuthProvider
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Check stored credentials and update auth state
   * Returns true if user is authenticated
   */
  const checkAuth = useCallback(async (): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING' });

    const result = await authService.checkStoredCredentials();

    if (result.hasValidToken && result.user) {
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user: result.user } });
      return true;
    } else {
      dispatch({ type: 'SET_UNAUTHENTICATED' });
      return false;
    }
  }, []);

  /**
   * Login with email and password
   */
  const login = useCallback(
    async (
      credentials: AuthCredentials
    ): Promise<{ success: boolean; error?: string }> => {
      dispatch({ type: 'SET_LOADING' });

      const result = await authService.login(credentials);

      if (result.success && result.user) {
        dispatch({ type: 'SET_AUTHENTICATED', payload: { user: result.user } });
        return { success: true };
      } else {
        dispatch({ type: 'SET_UNAUTHENTICATED' });
        return { success: false, error: result.error };
      }
    },
    []
  );

  /**
   * Register a new user
   */
  const register = useCallback(
    async (data: {
      username: string;
      email: string;
      password: string;
    }): Promise<{ success: boolean; error?: string }> => {
      dispatch({ type: 'SET_LOADING' });

      const result = await authService.register(data);

      if (result.success && result.user) {
        dispatch({ type: 'SET_AUTHENTICATED', payload: { user: result.user } });
        return { success: true };
      } else {
        dispatch({ type: 'SET_UNAUTHENTICATED' });
        return { success: false, error: result.error };
      }
    },
    []
  );

  /**
   * Login with social provider
   */
  const socialLogin = useCallback(
    async (
      provider: SocialAuthProvider
    ): Promise<{ success: boolean; error?: string }> => {
      dispatch({ type: 'SET_LOADING' });

      const result = await authService.socialLogin(provider);

      if (result.success && result.user) {
        dispatch({ type: 'SET_AUTHENTICATED', payload: { user: result.user } });
        return { success: true };
      } else {
        dispatch({ type: 'SET_UNAUTHENTICATED' });
        return { success: false, error: result.error };
      }
    },
    []
  );

  /**
   * Logout user
   */
  const logout = useCallback(async (): Promise<void> => {
    await authService.logout();
    dispatch({ type: 'SET_UNAUTHENTICATED' });
  }, []);

  /**
   * Update user data
   */
  const updateUser = useCallback((user: User): void => {
    dispatch({ type: 'UPDATE_USER', payload: { user } });
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({
      state,
      checkAuth,
      login,
      register,
      socialLogin,
      logout,
      updateUser,
    }),
    [state, checkAuth, login, register, socialLogin, logout, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export status type helper
export const isAuthenticated = (status: AuthStatus): boolean =>
  status === 'authenticated';
export const isLoading = (status: AuthStatus): boolean => status === 'loading';
