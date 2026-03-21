/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        // `sans` is Tailwind's default — overriding it makes font-sans (and our
        // custom <Text> component) use Pathway Extreme automatically app-wide.
        sans: ['PathwayExtreme_400Regular'],
        // Explicit weight utilities for use alongside font-sans overrides:
        //   font-pathway-medium   → PathwayExtreme_500Medium
        //   font-pathway-semibold → PathwayExtreme_600SemiBold
        //   font-pathway-bold     → PathwayExtreme_700Bold
        //   font-pathway-extrabold→ PathwayExtreme_800ExtraBold
        //   font-pathway-black    → PathwayExtreme_900Black
        'pathway-italic': ['PathwayExtreme_400Regular_Italic'],
        'pathway-medium': ['PathwayExtreme_500Medium'],
        'pathway-semibold': ['PathwayExtreme_600SemiBold'],
        'pathway-bold': ['PathwayExtreme_700Bold'],
        'pathway-bold-italic': ['PathwayExtreme_700Bold_Italic'],
        'pathway-extrabold': ['PathwayExtreme_800ExtraBold'],
        'pathway-black': ['PathwayExtreme_900Black'],
      },
    },
  },
  plugins: [],
}