// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://api.yourgame.com/v1',
  TIMEOUT: 30000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      VERIFY: '/auth/verify',
      SOCIAL: '/auth/social',
    },
    USER: {
      PROFILE: '/user/profile',
      UPDATE: '/user/update',
    },
    REALMS: {
      LIST: '/realms',
      DETAIL: '/realms/:id',
      CHARACTERS: '/realms/:id/characters',
    },
  },
};

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@game_flow/auth_token',
  USER_DATA: '@game_flow/user_data',
  SETTINGS: '@game_flow/settings',
  LAST_REALM: '@game_flow/last_realm',
};

// Token Configuration
export const TOKEN_CONFIG = {
  // Buffer time in milliseconds before token expiry to consider it expired
  EXPIRY_BUFFER: 5 * 60 * 1000, // 5 minutes
};

// Theme Colors
export const COLORS = {
  // Primary palette
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',

  // Secondary palette
  secondary: '#10B981',
  secondaryDark: '#059669',
  secondaryLight: '#34D399',

  // Accent colors
  accent: '#F59E0B',
  accentDark: '#D97706',
  accentLight: '#FBBF24',

  // Status colors
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Realm status colors
  realmOnline: '#22C55E',
  realmOffline: '#6B7280',
  realmMaintenance: '#F59E0B',

  // Background colors
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  backgroundTertiary: '#334155',
  card: '#1E293B',
  cardHighlight: '#334155',

  // Text colors
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0F172A',

  // Border colors
  border: '#334155',
  borderLight: '#475569',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayDark: 'rgba(0, 0, 0, 0.8)',
};

// Typography
export const TYPOGRAPHY = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.4,
    relaxed: 1.6,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
};

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Social Auth Providers
export const SOCIAL_PROVIDERS = [
  {
    id: 'google',
    name: 'Google',
    color: '#DB4437',
    icon: 'google',
  },
  {
    id: 'apple',
    name: 'Apple',
    color: '#000000',
    icon: 'apple',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#4267B2',
    icon: 'facebook',
  },
  {
    id: 'discord',
    name: 'Discord',
    color: '#5865F2',
    icon: 'discord',
  },
] as const;

// Screen Names
export const SCREENS = {
  SPLASH: 'Splash',
  GUEST_HOME: 'GuestHome',
  LOGIN: 'Login',
  REGISTER: 'Register',
  REALM_SELECT_HOME: 'RealmSelectHome',
  REALM_DETAIL: 'RealmDetail',
} as const;

// Animation Durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// Game Info for Guest Screen
export const GAME_INFO = {
  title: 'Epic Realms',
  tagline: 'Enter a World of Adventure',
  description:
    'Join millions of players in an epic multiplayer experience. Create your character, choose your realm, and embark on legendary quests.',
  features: [
    {
      title: 'Multiple Realms',
      description: 'Choose from various realms, each with unique challenges',
      icon: '🌍',
    },
    {
      title: 'Create Characters',
      description: 'Build and customize your heroes',
      icon: '⚔️',
    },
    {
      title: 'Epic Quests',
      description: 'Embark on legendary adventures',
      icon: '📜',
    },
    {
      title: 'Play Together',
      description: 'Team up with friends from around the world',
      icon: '👥',
    },
  ],
};
