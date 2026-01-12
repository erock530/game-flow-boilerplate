import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthToken, User } from '../types';
import { STORAGE_KEYS } from '../constants';

/**
 * Storage Service
 * Handles all AsyncStorage operations for the app
 */
class StorageService {
  /**
   * Save auth token to storage
   */
  async saveAuthToken(token: AuthToken): Promise<void> {
    try {
      const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, jsonValue);
    } catch (error) {
      console.error('Error saving auth token:', error);
      throw new Error('Failed to save authentication token');
    }
  }

  /**
   * Get auth token from storage
   */
  async getAuthToken(): Promise<AuthToken | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Remove auth token from storage
   */
  async removeAuthToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error removing auth token:', error);
      throw new Error('Failed to remove authentication token');
    }
  }

  /**
   * Save user data to storage
   */
  async saveUserData(user: User): Promise<void> {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, jsonValue);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw new Error('Failed to save user data');
    }
  }

  /**
   * Get user data from storage
   */
  async getUserData(): Promise<User | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  /**
   * Remove user data from storage
   */
  async removeUserData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    } catch (error) {
      console.error('Error removing user data:', error);
      throw new Error('Failed to remove user data');
    }
  }

  /**
   * Save last selected realm ID
   */
  async saveLastRealm(realmId: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_REALM, realmId);
    } catch (error) {
      console.error('Error saving last realm:', error);
    }
  }

  /**
   * Get last selected realm ID
   */
  async getLastRealm(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LAST_REALM);
    } catch (error) {
      console.error('Error getting last realm:', error);
      return null;
    }
  }

  /**
   * Save app settings
   */
  async saveSettings(settings: Record<string, unknown>): Promise<void> {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, jsonValue);
    } catch (error) {
      console.error('Error saving settings:', error);
      throw new Error('Failed to save settings');
    }
  }

  /**
   * Get app settings
   */
  async getSettings(): Promise<Record<string, unknown> | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting settings:', error);
      return null;
    }
  }

  /**
   * Clear all stored credentials (for logout)
   */
  async clearCredentials(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
      ]);
    } catch (error) {
      console.error('Error clearing credentials:', error);
      throw new Error('Failed to clear credentials');
    }
  }

  /**
   * Clear all app data
   */
  async clearAll(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw new Error('Failed to clear all data');
    }
  }
}

export const storageService = new StorageService();
