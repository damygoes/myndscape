export const APP_COLORS = {
  // Element Colors
  primary: '#DC560E',
  'primary-subtle': '#f5c3a94d',
  secondary: '#5F5E5F',
  success: '#0B8600',
  error: '#C40000',
  white: '#FFFFFF',
  black: '#1D1D1D',
  offwhite: '#F8F8F8',
  grey: '#E4E7EC',

  // Text Colors
  'body-text': '#3B3B3B',
  'body-text-disabled': '#A0A0A0',
  'body-text-reversed': '#fafafae0',
  'body-text-reversed-disabled': '#fafafa52',

  // Background Colors
  'primary-background': '#FCFCFC',
  'background-stroke': '#E5E7EB',
};

export const COLORS = {
  dark: {
    // New Theme Colors
    // Element Colors
    primary: '#DC560E',
    secondary: '#5F5E5F',
    success: '#0B8600',
    error: '#C40000',
    white: '#FFFFFF',
    black: '#1D1D1D',
    offwhite: '#F8F8F8',
    grey: '#E4E7EC',

    // Text Colors
    'body-text': '#3B3B3B',
    'body-text-disabled': '#A0A0A0',
    'body-text-reversed': '#fafafae0',
    'body-text-reversed-disabled': '#fafafa52',

    // Background Colors
    'primary-background': '#FCFCFC',
    'background-stroke': '#E5E7EB',
    ///////////
    /**DELETE THE BELOW COLORS LATER */
    // Base
    background: '#1F1E1D', // Dark charcoal warm grey
    cardBackground: 'rgba(255, 255, 255, 0.08)',

    // Borders & shadows
    border: 'rgba(255, 255, 255, 0.18)',
    shadow: 'rgba(0, 0, 0, 0.6)',

    // Text
    textPrimary: '#F1E6E2', // Soft cream
    textSecondary: '#D6C6C2', // Dusty blush
    textMuted: '#A39894', // Warm grey
    textError: '#E07A5F', // Muted terracotta red
    warning: '#E7B68A', // Warm beige
    danger: '#C94C3D', // Deep muted red

    // Accent
    primaryHover: '#B56057', // Darker muted coral

    // Input
    inputBackground: '#2D2B29', // Dark warm grey
    inputBorder: '#5C5A58',
    inputPlaceholder: '#8B8682',
  },

  light: {
    // New Theme Colors
    // Element Colors
    primary: '#DC560E',
    secondary: '#5F5E5F',
    success: '#0B8600',
    error: '#C40000',
    white: '#FFFFFF',
    black: '#1D1D1D',
    offwhite: '#F8F8F8',
    grey: '#E4E7EC',

    // Text Colors
    'body-text': '#3B3B3B',
    'body-text-disabled': '#A0A0A0',
    'body-text-reversed': '#fafafae0',
    'body-text-reversed-disabled': '#fafafa52',

    // Background Colors
    'primary-background': '#FCFCFC',
    'background-stroke': '#E5E7EB',
    ///////////
    /**DELETE THE BELOW COLORS LATER */
    // Base
    background: '#FAF6F2', // Creamy warm off-white
    cardBackground: 'rgba(0, 0, 0, 0.04)',

    // Borders & shadows
    border: 'rgba(0, 0, 0, 0.12)',
    shadow: 'rgba(0, 0, 0, 0.06)',

    // Text
    textPrimary: '#4C3B36', // Warm dark brown-grey
    textSecondary: '#7C6B66', // Dusty warm grey
    textMuted: '#B2AAA5', // Light warm grey
    textError: '#D96E5B', // Warm terracotta
    warning: '#DDBB9D', // Warm beige
    danger: '#AA3F36', // Muted deep red

    // Accent
    primaryHover: '#A2574C', // Darker muted coral

    // Input
    inputBackground: '#FFFFFF',
    inputBorder: '#D9D2CD',
    inputPlaceholder: '#BDB3AB',
  },

  moods: {
    happy: '#F2C6AC', // Soft peach
    sad: '#D8B0A7', // Dusty rose
    anxious: '#E89A87', // Muted coral
    excited: '#DBA798', // Warm blush
    neutral: '#BEB3AB', // Warm light grey
    tired: '#C3A199', // Soft taupe
    optimistic: '#E2B79E', // Warm apricot
    reflective: '#C9A998', // Muted beige
    hopeful: '#DCC8B6', // Pale peach beige
    stressed: '#D8806F', // Warm terracotta
    grateful: '#E8CDBB', // Soft blush beige
    peaceful: '#EDE3DA', // Creamy neutral
    content: '#E1BFAF', // Pale peach
    funky: '#A8DADC', // Soft minty blue
    despair: '#F4A261', // Muted orange
    desperate: '#2A9D8F', // Soft teal
    craving: '#264653', // Deep muted blue
    frustrated: '#E76F51', // Warm coral red
    joyful: '#F9C74F', // Bright yellow
    mixed: '#90BE6D', // Soft green
  },

  wellness: {
    breathe: '#D8B4A6', // Dusty peach
    focus: '#CDB09C', // Muted beige
    rest: '#F3E9E2', // Light cream
    energy: '#EFC9B7', // Soft warm apricot
  },
};

export type ThemeColors = typeof COLORS.light;
