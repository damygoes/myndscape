import { Button } from '@/components/button/Button';
import { Input } from '@/components/input/Input';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { APP_COLORS } from '@/constants/colors';
import { useUpdateUserProfile } from '@/features/profile/hooks/useUpdateUserProfile';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ProfileSectionProps = {
  title: string;
  description: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export default function QuickOnboardingProfileInfo() {
  const [userName, setUserName] = useState('');
  const [moodCheck, setMoodCheck] = useState('');
  const [bio, setBio] = useState('');

  const { userId } = useLocalSearchParams<{ userId: string }>();

  const { mutateAsync, isPending, isSuccess, error } =
    useUpdateUserProfile(userId);

  const isButtonDisabled =
    isPending ||
    userName.trim() === '' ||
    moodCheck.trim() === '' ||
    bio.trim() === '';

  const handleSubmit = async () => {
    await mutateAsync({
      username: userName,
      emotion_check: moodCheck,
      bio: bio,
      isonboarded: true,
    });

    if (error) {
      console.error('Failed to update profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }

    if (isSuccess) {
      router.push('/');
    }
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 120}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileSection
            title="Hi there! 👋"
            description="I’m Myndscape — your journaling companion. What’s your name or nickname? I’d love to call you something personal."
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your username"
          />

          <ProfileSection
            title="Emotional Check 💭"
            description="If you had to sum up how your days usually feel, which one fits best?"
            value={moodCheck}
            onChangeText={setMoodCheck}
            placeholder="Enter your answer"
          />

          <ProfileSection
            title="Bio"
            description="Share a little about yourself — who you are, what you love, or anything that feels you."
            value={bio}
            onChangeText={setBio}
            placeholder="Enter your answer"
            multiline
          />

          <Button
            title="Submit"
            onPress={handleSubmit}
            style={styles.button}
            loading={isPending}
            disabled={isButtonDisabled}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </ThemedSafeAreaView>
  );
}

function ProfileSection({
  title,
  description,
  value,
  onChangeText,
  placeholder,
  multiline = false,
}: ProfileSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{description}</Text>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        containerStyle={{ marginTop: 8 }}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    gap: 16,
    paddingVertical: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
  },
  intro: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    marginBottom: 16,
    fontFamily: 'Manrope',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_COLORS['body-text'],
    fontFamily: 'Manrope',
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    fontFamily: 'Manrope',
  },
  button: {
    marginTop: 24,
    marginBottom: 32,
  },
});
