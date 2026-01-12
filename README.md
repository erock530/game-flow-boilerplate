# Game Flow Boilerplate

A React Native game framework boilerplate for iOS and Android with a complete authentication flow, realm selection, and modern UI components.

## Features

- **Complete Authentication Flow**
  - Splash screen with credential detection
  - Guest home with game information
  - Login with email/password and social providers
  - Registration with form validation
  - Token management with expiry handling
  - Secure credential storage

- **Realm Selection System**
  - List of available game realms
  - Population tracking with visual indicators
  - Character count per realm
  - Realm status (online/offline/maintenance)
  - PvP/PvE indicators

- **Modern Architecture**
  - TypeScript throughout
  - React Context for state management
  - Service-based API layer
  - Reusable UI components
  - Clean folder structure

## Project Structure

```
game-flow-boilerplate/
├── src/
│   ├── assets/           # Images, fonts, etc.
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── RealmCard.tsx
│   │   ├── SocialLoginButton.tsx
│   │   └── LoadingScreen.tsx
│   ├── constants/        # App-wide constants
│   │   └── index.ts      # Colors, typography, API config
│   ├── context/          # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/          # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── GuestHomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── RealmSelectHomeScreen.tsx
│   ├── services/         # API and storage services
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── storage.ts
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/            # Utility functions
│   │   └── index.ts
│   └── App.tsx           # Main app component
├── index.js              # Entry point
├── app.json              # App configuration
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── babel.config.js       # Babel config
└── metro.config.js       # Metro bundler config
```

## Screen Flow

```
┌─────────────────┐
│  Splash Screen  │
│                 │
│  • Check token  │
│  • Verify auth  │
└────────┬────────┘
         │
    Token valid?
         │
    ┌────┴────┐
    │         │
   Yes        No
    │         │
    ▼         ▼
┌─────────┐ ┌─────────────┐
│ Realm   │ │ Guest Home  │
│ Select  │ │             │
│ Home    │ │ • Game info │
│         │ │ • Join/Login│
└─────────┘ └──────┬──────┘
                   │
              ┌────┴────┐
              │         │
            Join      Login
              │         │
              ▼         ▼
         ┌────────┐ ┌────────┐
         │Register│ │ Login  │
         │ Screen │ │ Screen │
         └───┬────┘ └───┬────┘
             │          │
             └────┬─────┘
                  │
             On Success
                  │
                  ▼
         ┌─────────────┐
         │ Realm Select│
         │    Home     │
         └─────────────┘
```

## Getting Started

### Prerequisites

- Node.js >= 18
- React Native CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

1. Clone or copy the project:
```bash
cd game-flow-boilerplate
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios && pod install && cd ..
```

4. Run the app:
```bash
# iOS
npm run ios

# Android
npm run android
```

## Configuration

### API Configuration

Update the API base URL in `src/constants/index.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api-domain.com/v1',
  // ...
};
```

### Theme Customization

Modify colors, typography, and spacing in `src/constants/index.ts`:

```typescript
export const COLORS = {
  primary: '#6366F1',
  // ...customize your theme
};
```

### Social Login Integration

To enable social login, integrate the respective SDKs:

1. **Google Sign-In**: `@react-native-google-signin/google-signin`
2. **Apple Sign-In**: `@invertase/react-native-apple-authentication`
3. **Facebook Login**: `react-native-fbsdk-next`
4. **Discord**: Custom OAuth implementation

Update the social login handlers in `LoginScreen.tsx` and `RegisterScreen.tsx`.

## API Endpoints Expected

The boilerplate expects the following API endpoints:

### Authentication
- `POST /auth/login` - Email/password login
- `POST /auth/register` - New user registration
- `POST /auth/social` - Social provider login
- `POST /auth/verify` - Verify token validity
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Invalidate token

### User
- `GET /user/profile` - Get user profile
- `PUT /user/update` - Update user profile

### Realms
- `GET /realms` - List all realms
- `GET /realms/:id` - Get realm details
- `GET /realms/:id/characters` - Get user's characters on realm

## Extending the Boilerplate

### Adding New Screens

1. Create screen component in `src/screens/`
2. Add to navigation in `src/navigation/AppNavigator.tsx`
3. Update types in `src/types/index.ts`

### Adding New Components

1. Create component in `src/components/`
2. Export from `src/components/index.ts`

### Adding New Services

1. Create service in `src/services/`
2. Export from `src/services/index.ts`

## Best Practices

- Use TypeScript types for all props and state
- Keep components small and focused
- Use the provided constants for styling
- Handle loading and error states
- Validate forms before submission
- Clear sensitive data on logout

## License

MIT License - Feel free to use this boilerplate for your projects.

## Support

For questions or issues, please open a GitHub issue or contact the development team.
