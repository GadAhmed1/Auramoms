/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode with class strategy
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        playpen: ['"Playpen Sans"', "sans-serif"],
        Cabin: ["Cabin", "sans-serif"],
        PlayWrite: ["Playwrite CU", "cursive"],
        Mate: ["Mate", "serif"],
      },
      colors: {
        SignUpPageColor: "#f1f1f1", // Similer to White but darker
        SignUpDarkColor: "#0c111d", // Similer to White but darker
        DarkBackground: "#0f172a", // Dark background color
        DarkText: "#e5e5e5", // Text color in dark mode
        DarkAccent: "#262626", // Accent color for dark mode
        DarkLink: "#b3b3b3", // Link color in dark mode
        PinkyColor: "#f4c2c2", // Light pink color
        LightGreenColor: "#c6e6e3", // Light green color
        GreenColorInDarkMood: "#b3b8a8", // Slightly darker shade of #dde2cc for dark mode
        HeavyPinkColor: "#d58aa6", // Heavy pink color
        lightGrayColor: "#d1d1d1", // Light gray color
        DarkPurpleColor: "#5c4675", // Dark purple color
        DarkPinkyColor: "#8a5454", // Dark pink color
        DarkLightGreenColor: "#3a5755", // Dark light green color
        DarkHeavyPinkColor: "#743f55", // Dark heavy pink color
        DarkLightGrayColor: "#3a3a3a", // Dark light gray color
        footerColor: "#406048", // White green color
        stloginColor: "#6bd9a8", // Light green color
        ndloginColor: "#46644c", // Dark olive green color
        formColor: "#46644c", // Dark olive green color (same as ndloginColor for consistency)
        cardColor: "#46644c", // Dark olive green color (used for card backgrounds)
        cardTextColor: "#648a6b", // Light green-gray color
        DarkGround1: "#121212", // Deep black color (dark mode primary background)
        DarkGround2: "#1e1e1e", // Charcoal dark gray color (secondary background)
        BabyPink: '#FDDDE6' ,
        MutedPink: '#F4A7B9',
        WarmGray: '#A8A8A8',
        WhiteSmoke: '#F5F5F5',
        DeepPinkAccent: '#C2185B',
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
