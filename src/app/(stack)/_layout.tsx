import { IconSymbol } from '@/components/ui/IconSymbol.ios';
import { COLORS } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppLocale } from '@/services/i18n/useAppLocale';
import { router, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function StackLayout() {
  const i18n = useAppLocale();
  const theme = useColorScheme() ?? 'light';
  const colors = COLORS[theme];

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '600',
          fontFamily: 'Manrope',
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTransparent: true,
          headerTitle: '',
          headerShadowVisible: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="add-entry"
        options={{
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontWeight: '400',
                  fontFamily: 'Manrope',
                  fontSize: 18,
                }}
              >
                {i18n.t('AddJournalEntry.title')}
              </Text>
            </View>
          ),
          presentation: 'modal',
          headerTitleAlign: 'left',
          headerRight: () => (
            <Pressable
              onPress={() => router.back()}
              style={{ marginRight: 12 }}
            >
              <IconSymbol name="close" size={20} color={colors.textPrimary} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
