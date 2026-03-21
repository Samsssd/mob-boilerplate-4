import React from 'react';

import { Text } from '@/components/Text';
import Colors from '@/constants/Colors';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { View, useThemeColor } from './Themed';

export default function EditScreenInfo({ path }: { path: string }) {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View>
      <View className="items-center mx-12">
        <Text className="text-[17px] leading-6 text-center text-black/80 dark:text-white/80">
          Open up the code for this screen:
        </Text>

        <View
          className="my-2 rounded px-1"
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

        <Text className="text-[17px] leading-6 text-center text-black/80 dark:text-white/80">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View className="mt-4 mx-5 items-center">
        <ExternalLink
          className="py-4"
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text className="text-center" style={{ color: tintColor }}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}
