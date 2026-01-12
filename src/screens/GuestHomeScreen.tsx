import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { Button } from '../../components';
import { COLORS, TYPOGRAPHY, SPACING, SCREENS, GAME_INFO } from '../../constants';

type GuestHomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'GuestHome'
>;

interface GuestHomeScreenProps {
  navigation: GuestHomeNavigationProp;
}

const { width } = Dimensions.get('window');

export const GuestHomeScreen: React.FC<GuestHomeScreenProps> = ({
  navigation,
}) => {
  const handleJoin = () => {
    navigation.navigate(SCREENS.REGISTER);
  };

  const handleLogin = () => {
    navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          {/* Logo/Placeholder for Game Art */}
          <View style={styles.heroImageContainer}>
            <View style={styles.heroImagePlaceholder}>
              <Text style={styles.heroEmoji}>⚔️🏰🐉</Text>
            </View>
          </View>

          {/* Title and Tagline */}
          <Text style={styles.title}>{GAME_INFO.title}</Text>
          <Text style={styles.tagline}>{GAME_INFO.tagline}</Text>

          {/* Description */}
          <Text style={styles.description}>{GAME_INFO.description}</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Play?</Text>
          <View style={styles.featuresGrid}>
            {GAME_INFO.features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Media Section Placeholder */}
        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>See It In Action</Text>
          <View style={styles.mediaPlaceholder}>
            <Text style={styles.mediaPlaceholderText}>
              🎬 Trailer Video Placeholder
            </Text>
            <Text style={styles.mediaHint}>
              Add your game trailer or screenshots here
            </Text>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Begin?</Text>
          <Text style={styles.ctaSubtitle}>
            Join millions of players worldwide
          </Text>

          <View style={styles.ctaButtons}>
            <Button
              title="Join Now"
              onPress={handleJoin}
              variant="primary"
              size="lg"
              fullWidth
              style={styles.ctaButton}
            />
            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="outline"
              size="lg"
              fullWidth
              style={styles.ctaButton}
            />
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By joining, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING['3xl'],
  },

  // Hero Section
  heroSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['2xl'],
    paddingBottom: SPACING['3xl'],
  },
  heroImageContainer: {
    marginBottom: SPACING.xl,
  },
  heroImagePlaceholder: {
    width: width * 0.6,
    height: width * 0.4,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroEmoji: {
    fontSize: 60,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize['4xl'],
    fontWeight: '800',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  tagline: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: SPACING.base,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.relaxed,
    paddingHorizontal: SPACING.base,
  },

  // Features Section
  featuresSection: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.base,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.fontSize.sm * TYPOGRAPHY.lineHeight.normal,
  },

  // Media Section
  mediaSection: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['2xl'],
  },
  mediaPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  mediaPlaceholderText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  mediaHint: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textMuted,
  },

  // CTA Section
  ctaSection: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING['2xl'],
    backgroundColor: COLORS.backgroundSecondary,
    marginHorizontal: SPACING.xl,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  ctaTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  ctaSubtitle: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  ctaButtons: {
    width: '100%',
    gap: SPACING.md,
  },
  ctaButton: {
    marginBottom: SPACING.sm,
  },

  // Footer
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING['2xl'],
    alignItems: 'center',
  },
  footerText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
