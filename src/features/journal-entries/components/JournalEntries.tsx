import { Image } from 'expo-image';
import { useRef } from 'react';
import { Animated, StyleSheet, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { ErrorState } from '@/components/ErrorState';
import { LoadingState } from '@/components/LoadingState';
import { COLORS } from '@/constants/colors';
import { JournalEntryItem } from '../journal-entry-item/components/JournalEntryItem';
import { useCurrentUserJournalEntries } from '../hooks/useCurrentUserJournalEntries';

const HEADER_HEIGHT = 250;

export const JournalEntries = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  const { data: entries, isLoading, error } = useCurrentUserJournalEntries();

  const renderParallaxHeader = () => {
    const scale = scrollY.interpolate({
      inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      outputRange: [2, 1, 1],
      extrapolate: 'clamp',
    });

    const translateY = scrollY.interpolate({
      inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
      extrapolate: 'clamp',
    });

    // New opacity interpolation:
    const opacity = scrollY.interpolate({
      inputRange: [0, HEADER_HEIGHT * 0.7, HEADER_HEIGHT],
      outputRange: [1, 0.3, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[
          styles.parallaxHeader,
          {
            transform: [{ translateY }, { scale }],
            opacity,
          },
        ]}
      >
        <Image
          source={require('../../../../assets/images/hero-2.jpg')}
          style={styles.headerImage}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={300}
          priority="high"
        />
      </Animated.View>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState message="Loading your journal entries..." />;
    }

    if (error) {
      return <ErrorState message="Failed to load your journal entries." />;
    }

    if (!entries || entries.length === 0) {
      return (
        <EmptyState message="You haven’t logged any mood entries yet. Tap the + button to add your first one!" />
      );
    }

    return (
      <Animated.FlatList
        data={entries}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <View style={styles.headerContainer}>{renderParallaxHeader()}</View>
        }
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
        }}
        ItemSeparatorComponent={() => <View className="h-4" />}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 16 }}>
            <JournalEntryItem key={item.id} entry={item} />
          </View>
        )}
        scrollEventThrottle={16}
      />
    );
  };

  return <>{renderContent()}</>;
};

const styles = StyleSheet.create({
  parallaxHeader: {
    width: '100%',
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    zIndex: 1,
    marginBottom: 24,
    width: '100%',
  },
});
