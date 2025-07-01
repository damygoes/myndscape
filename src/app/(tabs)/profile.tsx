import { ThemedSafeAreaView } from '@/components/layouts/ThemedSafeAreaView';
import { Text } from "react-native";

export default function Profile() {
  return (
    <ThemedSafeAreaView>
      <Text className="text-3xl text-center text-red-400">Profile</Text>
    </ThemedSafeAreaView>
  );
}