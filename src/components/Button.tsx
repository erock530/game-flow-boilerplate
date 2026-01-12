import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: isDisabled ? COLORS.primaryLight : COLORS.primary,
        };
      case 'secondary':
        return {
          backgroundColor: isDisabled ? COLORS.secondaryLight : COLORS.secondary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: isDisabled ? COLORS.textMuted : COLORS.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
      case 'danger':
        return {
          backgroundColor: isDisabled ? '#F87171' : COLORS.error,
        };
      default:
        return {
          backgroundColor: COLORS.primary,
        };
    }
  };

  const getTextColor = (): string => {
    if (isDisabled && variant !== 'outline' && variant !== 'ghost') {
      return COLORS.textSecondary;
    }
    switch (variant) {
      case 'outline':
      case 'ghost':
        return isDisabled ? COLORS.textMuted : COLORS.primary;
      default:
        return COLORS.text;
    }
  };

  const getSizeStyles = (): { container: ViewStyle; text: TextStyle } => {
    switch (size) {
      case 'sm':
        return {
          container: {
            paddingVertical: SPACING.sm,
            paddingHorizontal: SPACING.md,
          },
          text: {
            fontSize: TYPOGRAPHY.fontSize.sm,
          },
        };
      case 'lg':
        return {
          container: {
            paddingVertical: SPACING.lg,
            paddingHorizontal: SPACING.xl,
          },
          text: {
            fontSize: TYPOGRAPHY.fontSize.lg,
          },
        };
      default:
        return {
          container: {
            paddingVertical: SPACING.md,
            paddingHorizontal: SPACING.base,
          },
          text: {
            fontSize: TYPOGRAPHY.fontSize.base,
          },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        getVariantStyles(),
        sizeStyles.container,
        fullWidth && styles.fullWidth,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text
            style={[
              styles.text,
              sizeStyles.text,
              { color: getTextColor() },
              icon && iconPosition === 'left' && styles.textWithIconLeft,
              icon && iconPosition === 'right' && styles.textWithIconRight,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && icon}
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
    borderRadius: BORDER_RADIUS.lg,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  textWithIconLeft: {
    marginLeft: SPACING.sm,
  },
  textWithIconRight: {
    marginRight: SPACING.sm,
  },
});
