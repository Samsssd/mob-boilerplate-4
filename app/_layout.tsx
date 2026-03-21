import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  PathwayExtreme_400Regular,
  PathwayExtreme_400Regular_Italic,
  PathwayExtreme_500Medium,
  PathwayExtreme_600SemiBold,
  PathwayExtreme_700Bold,
  PathwayExtreme_700Bold_Italic,
  PathwayExtreme_800ExtraBold,
  PathwayExtreme_900Black,
} from '@expo-google-fonts/pathway-extreme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/components/useColorScheme';
import { FONT_SEMIBOLD } from '@/constants/fonts';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PathwayExtreme_400Regular,
    PathwayExtreme_400Regular_Italic,
    PathwayExtreme_500Medium,
    PathwayExtreme_600SemiBold,
    PathwayExtreme_700Bold,
    PathwayExtreme_700Bold_Italic,
    PathwayExtreme_800ExtraBold,
    PathwayExtreme_900Black,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const queryClient = new QueryClient();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerTitleStyle: { fontFamily: FONT_SEMIBOLD } }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
