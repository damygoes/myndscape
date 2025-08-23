import { Button } from '@/components/button/Button';
import { ErrorState } from '@/components/ErrorState';
import { Input } from '@/components/input/Input';
import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { LoadingState } from '@/components/LoadingState';
import { APP_COLORS } from '@/constants/colors';
import { useUpdateUserProfile } from '@/features/profile/hooks/useUpdateUserProfile';
import { useUserProfile } from '@/features/profile/hooks/useUserProfile';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type ProfileSectionProps = {
  title: string;
  description: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
};

export default function ProfileInfo() {
  const [userName, setUserName] = useState('');
  const [moodCheck, setMoodCheck] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);

  const { userId } = useLocalSearchParams<{ userId: string }>();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await useUpdateUserProfile(userId, {
        username: userName,
        emotion_check: moodCheck,
        bio: bio,
        isonboarded: true,
      });
      setLoading(false);
      router.push('/'); // Navigate to home after profile update
    } catch (error) {
      console.error('Failed to update profile:', error);
      setLoading(false);
    }
  };

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        extraScrollHeight={Platform.OS === 'ios' ? 100 : 120} // adjust as needed
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <ProfileSection
            title="Hi there! 👋"
            description="I’m Myndscape — your little mind buddy. What’s your name or nickname? I’d love to call you something personal."
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
            loading={loading}
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
  },
  intro: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
    marginBottom: 16,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: APP_COLORS['body-text'],
  },
  sectionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: APP_COLORS['body-text-disabled'],
  },
  button: {
    marginTop: 24,
    marginBottom: 32,
  },
});
