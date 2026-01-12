import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './context';
import { AppNavigator } from './navigation';
import { COLORS } from './constants';

/**
 * Main App Component
 *
 * This is the root component that wraps the entire application with:
 * - SafeAreaProvider: Handles safe area insets for notched devices
 * - AuthProvider: Provides authentication state throughout the app
 * - AppNavigator: Handles all navigation logic
 */
const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.background}
        translucent={false}
      />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
