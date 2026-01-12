import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import {
  SplashScreen,
  GuestHomeScreen,
  LoginScreen,
  RegisterScreen,
  RealmSelectHomeScreen,
} from '../screens';
import { COLORS, SCREENS, TYPOGRAPHY, SPACING } from '../constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREENS.SPLASH}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.background },
          animation: 'fade',
        }}
      >
        {/* Splash Screen - Entry point */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            animation: 'none',
          }}
        />

        {/* Guest/Unauthenticated Screens */}
        <Stack.Screen
          name="GuestHome"
          component={GuestHomeScreen}
          options={{
            animation: 'fade',
          }}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />

        {/* Authenticated Screens */}
        <Stack.Screen
          name="RealmSelectHome"
          component={RealmSelectHomeScreen}
          options={{
            animation: 'fade',
            gestureEnabled: false, // Prevent going back to login/splash
          }}
        />

        {/* Placeholder for RealmDetail screen */}
        <Stack.Screen
          name="RealmDetail"
          component={RealmDetailPlaceholder}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Placeholder component for RealmDetail screen
type RealmDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RealmDetail'
>;
type RealmDetailRouteProp = RouteProp<RootStackParamList, 'RealmDetail'>;

interface RealmDetailProps {
  navigation: RealmDetailNavigationProp;
  route: RealmDetailRouteProp;
}

const RealmDetailPlaceholder: React.FC<RealmDetailProps> = ({
  navigation,
  route,
}) => {
  const { realmId } = route.params;

  return (
    <SafeAreaView style={placeholderStyles.container}>
      <TouchableOpacity
        style={placeholderStyles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={placeholderStyles.backButtonText}>← Back to Realms</Text>
      </TouchableOpacity>
      <View style={placeholderStyles.content}>
        <Text style={placeholderStyles.title}>Realm Detail</Text>
        <Text style={placeholderStyles.subtitle}>Realm ID: {realmId}</Text>
        <Text style={placeholderStyles.placeholder}>
          This screen would display realm details, character selection, and
          options to enter the game world.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const placeholderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: SPACING.xl,
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  placeholder: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSize.base * 1.6,
  },
});
