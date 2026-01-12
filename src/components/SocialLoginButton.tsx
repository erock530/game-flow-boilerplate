import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';

type SocialProvider = 'google' | 'apple' | 'facebook' | 'discord';

interface SocialLoginButtonProps {
  provider: SocialProvider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

const PROVIDER_CONFIG: Record<
  SocialProvider,
  { name: string; color: string; icon: string }
> = {
  google: { name: 'Google', color: '#DB4437', icon: 'G' },
  apple: { name: 'Apple', color: '#000000', icon: '' },
  facebook: { name: 'Facebook', color: '#4267B2', icon: 'f' },
  discord: { name: 'Discord', color: '#5865F2', icon: 'D' },
};

export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onPress,
  loading = false,
  disabled = false,
  style,
}) => {
  const config = PROVIDER_CONFIG[provider];
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: config.color },
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} size="small" />
      ) : (
        <>
          <Text style={styles.icon}>{config.icon}</Text>
          <Text style={styles.text}>Continue with {config.name}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.base,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
  },
  disabled: {
    opacity: 0.6,
  },
  icon: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
    color: COLORS.text,
  },
});
