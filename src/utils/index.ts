import { AuthToken } from '../types';
import { TOKEN_CONFIG } from '../constants';

/**
 * Check if a token is expired
 * @param token - The auth token to check
 * @returns boolean indicating if token is expired
 */
export const isTokenExpired = (token: AuthToken | null): boolean => {
  if (!token) return true;

  const now = Date.now();
  const expiryTime = token.expiresAt - TOKEN_CONFIG.EXPIRY_BUFFER;

  return now >= expiryTime;
};

/**
 * Format population display
 * @param current - Current population
 * @param max - Maximum population
 * @returns Formatted string like "1,234 / 5,000"
 */
export const formatPopulation = (current: number, max: number): string => {
  return `${current.toLocaleString()} / ${max.toLocaleString()}`;
};

/**
 * Get population percentage
 * @param current - Current population
 * @param max - Maximum population
 * @returns Percentage as number between 0 and 100
 */
export const getPopulationPercentage = (current: number, max: number): number => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};

/**
 * Get color based on population percentage
 * @param percentage - Population percentage
 * @returns Color code for status indication
 */
export const getPopulationColor = (percentage: number): string => {
  if (percentage >= 90) return '#EF4444'; // Red - nearly full
  if (percentage >= 70) return '#F59E0B'; // Yellow - high
  if (percentage >= 40) return '#22C55E'; // Green - medium
  return '#3B82F6'; // Blue - low
};

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Object with isValid and message
 */
export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter',
    };
  }
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter',
    };
  }
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number',
    };
  }
  return { isValid: true, message: 'Password is strong' };
};

/**
 * Validate username
 * @param username - Username to validate
 * @returns Object with isValid and message
 */
export const validateUsername = (
  username: string
): { isValid: boolean; message: string } => {
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters' };
  }
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, and underscores',
    };
  }
  return { isValid: true, message: 'Username is valid' };
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
};

/**
 * Format date to relative time
 * @param dateString - ISO date string
 * @returns Relative time string like "2 hours ago"
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return date.toLocaleDateString();
};

/**
 * Delay execution
 * @param ms - Milliseconds to delay
 * @returns Promise that resolves after delay
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Generate a unique ID
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
