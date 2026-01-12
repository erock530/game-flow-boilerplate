import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Realm } from '../../types';
import { RealmCard, LoadingScreen, Button } from '../../components';
import { useAuth } from '../../context';
import { apiService } from '../../services';
import { COLORS, TYPOGRAPHY, SPACING, SCREENS } from '../../constants';

type RealmSelectHomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RealmSelectHome'
>;

interface RealmSelectHomeScreenProps {
  navigation: RealmSelectHomeNavigationProp;
}

export const RealmSelectHomeScreen: React.FC<RealmSelectHomeScreenProps> = ({
  navigation,
}) => {
  const { state, logout } = useAuth();
  const { user } = state;

  const [realms, setRealms] = useState<Realm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRealms = useCallback(async () => {
    try {
      setError(null);
      const result = await apiService.getRealms();

      if (result.success && result.data) {
        setRealms(result.data);
      } else {
        // For demo purposes, use mock data if API fails
        setRealms(getMockRealms());
      }
    } catch (err) {
      console.error('Error fetching realms:', err);
      // Use mock data for demonstration
      setRealms(getMockRealms());
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRealms();
  }, [fetchRealms]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRealms();
  };

  const handleRealmPress = (realm: Realm) => {
    if (realm.status !== 'online') {
      Alert.alert(
        'Realm Unavailable',
        `${realm.name} is currently ${realm.status}. Please try again later.`
      );
      return;
    }

    // Navigate to realm detail or character selection
    navigation.navigate('RealmDetail', { realmId: realm.id });
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.replace(SCREENS.GUEST_HOME);
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingScreen message="Loading realms..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Select Realm</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userLabel}>User: </Text>
            <Text style={styles.username}>{user?.username || 'Unknown'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Error State */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Retry"
            onPress={fetchRealms}
            variant="outline"
            size="sm"
          />
        </View>
      )}

      {/* Realm List */}
      <FlatList
        data={realms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RealmCard realm={item} onPress={handleRealmPress} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No realms available</Text>
            <Text style={styles.emptySubtext}>
              Pull down to refresh or check back later
            </Text>
          </View>
        }
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              Choose a realm to begin your adventure
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{realms.length}</Text>
                <Text style={styles.statLabel}>Realms</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {realms.filter((r) => r.status === 'online').length}
                </Text>
                <Text style={styles.statLabel}>Online</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {realms.reduce((sum, r) => sum + r.userCharacterCount, 0)}
                </Text>
                <Text style={styles.statLabel}>Characters</Text>
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

// Mock data for demonstration
const getMockRealms = (): Realm[] => [
  {
    id: '1',
    name: 'Stormwind',
    description: 'The primary realm for new adventurers. A balanced PvE experience with moderate population.',
    region: 'US East',
    status: 'online',
    currentPopulation: 12453,
    maxPopulation: 20000,
    userCharacterCount: 3,
    isPvP: false,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Blackrock',
    description: 'High-stakes PvP combat realm. Only the strongest survive in this cutthroat environment.',
    region: 'US West',
    status: 'online',
    currentPopulation: 18234,
    maxPopulation: 20000,
    userCharacterCount: 1,
    isPvP: true,
    createdAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Frostmourne',
    description: 'European realm with active community events and guild activities.',
    region: 'EU Central',
    status: 'online',
    currentPopulation: 8923,
    maxPopulation: 15000,
    userCharacterCount: 0,
    isPvP: false,
    createdAt: '2023-02-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Ragnaros',
    description: 'Latin American realm with localized content and events.',
    region: 'SA',
    status: 'maintenance',
    currentPopulation: 0,
    maxPopulation: 10000,
    userCharacterCount: 0,
    isPvP: false,
    createdAt: '2023-03-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Shadowlands',
    description: 'Asia-Pacific realm optimized for low latency gaming experience.',
    region: 'AP Southeast',
    status: 'online',
    currentPopulation: 5621,
    maxPopulation: 15000,
    userCharacterCount: 2,
    isPvP: true,
    createdAt: '2023-04-01T00:00:00Z',
  },
];

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: TYPOGRAPHY.fontSize['2xl'],
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLabel: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textMuted,
  },
  username: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  logoutButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  logoutButtonText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    fontWeight: '600',
  },

  // List
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING['3xl'],
  },
  listHeader: {
    paddingVertical: SPACING.xl,
  },
  listHeaderText: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.base,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },

  // Error
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.error + '20',
    marginHorizontal: SPACING.xl,
    marginTop: SPACING.md,
    padding: SPACING.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.error,
    flex: 1,
    marginRight: SPACING.md,
  },

  // Empty
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING['4xl'],
  },
  emptyText: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  emptySubtext: {
    fontSize: TYPOGRAPHY.fontSize.base,
    color: COLORS.textMuted,
  },
});
