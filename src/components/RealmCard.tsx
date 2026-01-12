import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Realm } from '../../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../../constants';
import {
  formatPopulation,
  getPopulationPercentage,
  getPopulationColor,
} from '../../utils';

interface RealmCardProps {
  realm: Realm;
  onPress: (realm: Realm) => void;
}

export const RealmCard: React.FC<RealmCardProps> = ({ realm, onPress }) => {
  const populationPercentage = getPopulationPercentage(
    realm.currentPopulation,
    realm.maxPopulation
  );
  const populationColor = getPopulationColor(populationPercentage);

  const getStatusColor = (): string => {
    switch (realm.status) {
      case 'online':
        return COLORS.realmOnline;
      case 'offline':
        return COLORS.realmOffline;
      case 'maintenance':
        return COLORS.realmMaintenance;
      default:
        return COLORS.textMuted;
    }
  };

  const getStatusText = (): string => {
    switch (realm.status) {
      case 'online':
        return 'Online';
      case 'offline':
        return 'Offline';
      case 'maintenance':
        return 'Maintenance';
      default:
        return 'Unknown';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        realm.status !== 'online' && styles.containerDisabled,
      ]}
      onPress={() => onPress(realm)}
      disabled={realm.status !== 'online'}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name}>{realm.name}</Text>
          <View style={styles.badges}>
            {realm.isPvP && (
              <View style={styles.pvpBadge}>
                <Text style={styles.pvpBadgeText}>PvP</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
          />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      {/* Region */}
      <Text style={styles.region}>{realm.region}</Text>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {realm.description}
      </Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {/* Population */}
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Population</Text>
          <View style={styles.populationContainer}>
            <Text style={[styles.statValue, { color: populationColor }]}>
              {formatPopulation(realm.currentPopulation, realm.maxPopulation)}
            </Text>
            <View style={styles.populationBar}>
              <View
                style={[
                  styles.populationFill,
                  {
                    width: `${populationPercentage}%`,
                    backgroundColor: populationColor,
                  },
                ]}
              />
            </View>
          </View>
        </View>

        {/* User Characters */}
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Your Characters</Text>
          <Text style={styles.statValue}>
            {realm.userCharacterCount === 0
              ? 'None'
              : realm.userCharacterCount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.base,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  containerDisabled: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '700',
    color: COLORS.text,
  },
  badges: {
    flexDirection: 'row',
    marginLeft: SPACING.sm,
  },
  pvpBadge: {
    backgroundColor: COLORS.error,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  pvpBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '700',
    color: COLORS.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  statusText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
  },
  region: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.fontSize.base * TYPOGRAPHY.lineHeight.normal,
    marginBottom: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.base,
    fontWeight: '600',
    color: COLORS.text,
  },
  populationContainer: {
    flex: 1,
  },
  populationBar: {
    height: 4,
    backgroundColor: COLORS.backgroundTertiary,
    borderRadius: 2,
    marginTop: SPACING.xs,
    overflow: 'hidden',
  },
  populationFill: {
    height: '100%',
    borderRadius: 2,
  },
});
