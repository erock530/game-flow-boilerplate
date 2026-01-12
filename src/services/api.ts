import {
  AuthCredentials,
  AuthToken,
  User,
  Realm,
  ApiResponse,
  SocialAuthProvider,
  RegisterFormData,
} from '../types';
import { API_CONFIG } from '../constants';
import { storageService } from './storage';

/**
 * API Service
 * Handles all API communication with the backend
 */
class ApiService {
  private baseUrl: string;
  private timeout: number;

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  /**
   * Make an authenticated request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    authenticated: boolean = false
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...((options.headers as Record<string, string>) || {}),
      };

      // Add auth token if authenticated request
      if (authenticated) {
        const token = await storageService.getAuthToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token.accessToken}`;
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: data.code || 'UNKNOWN_ERROR',
            message: data.message || 'An unknown error occurred',
            details: data.details,
          },
        };
      }

      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Network request failed';

      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: errorMessage,
        },
      };
    }
  }

  // ==================== AUTH ENDPOINTS ====================

  /**
   * Login with email and password
   */
  async login(
    credentials: AuthCredentials
  ): Promise<ApiResponse<{ token: AuthToken; user: User }>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  /**
   * Register a new user
   */
  async register(
    data: Omit<RegisterFormData, 'confirmPassword'>
  ): Promise<ApiResponse<{ token: AuthToken; user: User }>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Login with social provider
   */
  async socialLogin(
    provider: SocialAuthProvider
  ): Promise<ApiResponse<{ token: AuthToken; user: User }>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.SOCIAL, {
      method: 'POST',
      body: JSON.stringify(provider),
    });
  }

  /**
   * Verify current token is still valid
   */
  async verifyToken(): Promise<ApiResponse<{ valid: boolean; user: User }>> {
    return this.request(
      API_CONFIG.ENDPOINTS.AUTH.VERIFY,
      {
        method: 'POST',
      },
      true
    );
  }

  /**
   * Refresh the auth token
   */
  async refreshToken(
    refreshToken: string
  ): Promise<ApiResponse<{ token: AuthToken }>> {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  /**
   * Logout (invalidate token on server)
   */
  async logout(): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      API_CONFIG.ENDPOINTS.AUTH.LOGOUT,
      {
        method: 'POST',
      },
      true
    );
  }

  // ==================== USER ENDPOINTS ====================

  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request(API_CONFIG.ENDPOINTS.USER.PROFILE, {}, true);
  }

  /**
   * Update user profile
   */
  async updateUserProfile(
    updates: Partial<User>
  ): Promise<ApiResponse<User>> {
    return this.request(
      API_CONFIG.ENDPOINTS.USER.UPDATE,
      {
        method: 'PUT',
        body: JSON.stringify(updates),
      },
      true
    );
  }

  // ==================== REALM ENDPOINTS ====================

  /**
   * Get list of all realms
   */
  async getRealms(): Promise<ApiResponse<Realm[]>> {
    return this.request(API_CONFIG.ENDPOINTS.REALMS.LIST, {}, true);
  }

  /**
   * Get specific realm details
   */
  async getRealmDetail(realmId: string): Promise<ApiResponse<Realm>> {
    const endpoint = API_CONFIG.ENDPOINTS.REALMS.DETAIL.replace(':id', realmId);
    return this.request(endpoint, {}, true);
  }

  /**
   * Get characters on a specific realm
   */
  async getRealmCharacters(
    realmId: string
  ): Promise<ApiResponse<{ characters: Character[] }>> {
    const endpoint = API_CONFIG.ENDPOINTS.REALMS.CHARACTERS.replace(
      ':id',
      realmId
    );
    return this.request(endpoint, {}, true);
  }
}

// Character type for internal use
interface Character {
  id: string;
  name: string;
  level: number;
  class: string;
  realmId: string;
}

export const apiService = new ApiService();
