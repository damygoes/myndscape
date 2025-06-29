import { Card, CardContent, CardDescription, CardTitle } from '@/components/card/Card';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export const TipCard = () => {
  return (
    <Card className="items-start gap-3 p-4 bg-green-100 dark:bg-green-900">
      <View className='flex-row items-center justify-center gap-1'>
      <Ionicons name="bulb-outline" size={18} color="#10B981" /> <CardTitle>Tip: </CardTitle>
      </View>
      <CardContent>
      <CardDescription className="text-green-800 dark:text-green-300">
        Take 5 minutes today to breathe deeply and reset your mood.
      </CardDescription>
      </CardContent>
    </Card>
  );
};
