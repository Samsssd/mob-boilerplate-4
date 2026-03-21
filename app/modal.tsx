import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text } from '@/components/Text';
import { View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-pathway-bold text-xl">Modal</Text>
      <View
        className="my-8 h-px w-4/5"
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
