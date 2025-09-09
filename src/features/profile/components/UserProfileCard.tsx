import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import { APP_COLORS } from '@/constants/colors';
import { useUserProfileContext } from '@/features/user/contexts/UserProfileContext';
import { useAppLocale } from '@/services/i18n/useAppLocale';

export default function UserProfileCard() {
  const i18n = useAppLocale();
  const { data } = useUserProfileContext();

  const getFallbackAvatar = () => {
    const initials = data?.username
      ?.split(' ')
      .map((name: string) => name.charAt(0).toUpperCase())
      .join('');
    return initials || '?';
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: APP_COLORS.primary + '20',
        padding: 16,
        borderRadius: 16,
        shadowColor: APP_COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        minHeight: 120,
        marginBottom: 16,
      }}
    >
      {data?.avatar_url ? (
        <Image
          source={{ uri: data.avatar_url }}
          style={{ width: 64, height: 64, borderRadius: 32, marginRight: 16 }}
          contentFit="cover"
        />
      ) : (
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            marginRight: 16,
            backgroundColor: APP_COLORS.primary + '50',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: APP_COLORS.primary,
              fontFamily: 'Manrope',
            }}
          >
            {getFallbackAvatar()}
          </Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: APP_COLORS.primary,
            marginBottom: 2,
            fontFamily: 'Manrope',
          }}
        >
          {data?.username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: APP_COLORS['body-text-disabled'],
            fontFamily: 'Manrope',
          }}
        >
          {data?.email}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: APP_COLORS['body-text'],
              fontFamily: 'Manrope',
            }}
          >
            {i18n.t('Settings.profile.bio')}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: APP_COLORS['body-text'],
              fontFamily: 'Manrope',
            }}
          >
            {data?.bio}
          </Text>
        </View>
      </View>
    </View>
  );
}
