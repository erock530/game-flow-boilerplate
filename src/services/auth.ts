import { AuthCredentials, AuthToken, User, SocialAuthProvider } from '../types';
import { apiService } from './api';
import { storageService } from './storage';
import { isTokenExpired } from '../utils';

/**
 * Auth Service
 * Handles authentication flow combining API calls and storage
 */
class AuthService {
  /**
   * Check if user has valid stored credentials
   * This is used by the Splash screen to determine navigation
   */
  async checkStoredCredentials(): Promise<{
    hasValidToken: boolean;
    user: User | null;
  }> {
    try {
      // Get stored token
      const token = await storageService.getAuthToken();

      // No token exists
      if (!token) {
        return { hasValidToken: false, user: null };
      }

      // Token is expired
      if (isTokenExpired(token)) {
        // Try to refresh the token
        const refreshResult = await this.refreshToken(token.refreshToken);

        if (!refreshResult.success) {
          // Clear invalid credentials
          await storageService.clearCredentials();
          return { hasValidToken: false, user: null };
        }

        // Token refreshed successfully, get user data
        const userData = await storageService.getUserData();
        return { hasValidToken: true, user: userData };
      }

      // Token exists and not expired - verify with server
      const verifyResult = await apiService.verifyToken();

      if (!verifyResult.success || !verifyResult.data?.valid) {
        // Token invalid on server
        await storageService.clearCredentials();
        return { hasValidToken: false, user: null };
      }

      // Token is valid
      return { hasValidToken: true, user: verifyResult.data.user };
    } catch (error) {
      console.error('Error checking stored credentials:', error);
      return { hasValidToken: false, user: null };
    }
  }

  /**
   * Login with email and password
   */
  async login(
    credentials: AuthCredentials
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const result = await apiService.login(credentials);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error?.message || 'Login failed',
        };
      }

      // Store credentials
      await storageService.saveAuthToken(result.data.token);
      await storageService.saveUserData(result.data.user);

      return { success: true, user: result.data.user };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Register a new user
   */
  async register(data: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const result = await apiService.register(data);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error?.message || 'Registration failed',
        };
      }

      // Store credentials
      await storageService.saveAuthToken(result.data.token);
      await storageService.saveUserData(result.data.user);

      return { success: true, user: result.data.user };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Login with social provider
   */
  async socialLogin(
    provider: SocialAuthProvider
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const result = await apiService.socialLogin(provider);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error?.message || 'Social login failed',
        };
      }

      // Store credentials
      await storageService.saveAuthToken(result.data.token);
      await storageService.saveUserData(result.data.user);

      return { success: true, user: result.data.user };
    } catch (error) {
      console.error('Social login error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Refresh the auth token
   */
  async refreshToken(
    refreshToken: string
  ): Promise<{ success: boolean; token?: AuthToken; error?: string }> {
    try {
      const result = await apiService.refreshToken(refreshToken);

      if (!result.success || !result.data) {
        return {
          success: false,
          error: result.error?.message || 'Token refresh failed',
        };
      }

      // Store new token
      await storageService.saveAuthToken(result.data.token);

      return { success: true, token: result.data.token };
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      // Call logout API (to invalidate token on server)
      await apiService.logout();

      // Clear local credentials regardless of API result
      await storageService.clearCredentials();

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local credentials even if API call fails
      await storageService.clearCredentials();
      return { success: true };
    }
  }

  /**
   * Get current user from storage
   */
  async getCurrentUser(): Promise<User | null> {
    return storageService.getUserData();
  }

  /**
   * Get current token from storage
   */
  async getCurrentToken(): Promise<AuthToken | null> {
    return storageService.getAuthToken();
  }
}

export const authService = new AuthService();
