import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { FONT_REGULAR } from '@/constants/fonts';

type TextProps = RNTextProps & {
  className?: string;
};

/**
 * Drop-in replacement for React Native's <Text>.
 * Applies Pathway Extreme (Regular 400) as the app-wide default font via
 * `font-sans` (mapped in tailwind.config.js). Override weight/style with
 * additional className utilities:
 *
 *   font-pathway-medium    → 500 Medium
 *   font-pathway-semibold  → 600 SemiBold
 *   font-pathway-bold      → 700 Bold
 *   font-pathway-extrabold → 800 ExtraBold
 *   font-pathway-black     → 900 Black
 *   font-pathway-italic    → 400 Italic
 *   font-pathway-bold-italic → 700 Bold Italic
 *
 * Usage:
 *   import { Text } from '@/components/Text';
 *   <Text className="text-base text-neutral-900">Hello</Text>
 *   <Text className="font-pathway-bold text-xl">Bold heading</Text>
 */
export function Text({ className = '', ...props }: TextProps) {
  return <RNText className={`font-sans ${className}`} {...props} />;
}
