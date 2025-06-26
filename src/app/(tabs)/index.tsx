import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import '../../../global.css';

export default function App() {
  return (
    <View className="items-center justify-center flex-1 p-4">
      <Text className='text-3xl text-center text-red-400'>Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}