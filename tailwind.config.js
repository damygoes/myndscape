/** @type {import('tailwindcss').Config} */

const colors = require('./src/constants/colors.ts');

module.exports = {
  content: [
    './App.tsx',
    './components/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: colors.background,
        cardBackground: colors.cardBackground,
        surfaceBackground: colors.surfaceBackground,
        border: colors.border,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        textMuted: colors.textMuted,
        textError: colors.textError,
        primary: colors.primary,
        primaryHover: colors.primaryHover,
        success: colors.success,
        warning: colors.warning,
        danger: colors.danger,
        inputBackground: colors.inputBackground,
        inputBorder: colors.inputBorder,
        inputPlaceholder: colors.inputPlaceholder,
      },
    },
  },
  plugins: [],
};
