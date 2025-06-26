import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Slot } from "expo-router";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#000",
    card: "#000",
    primary: "white",
    text: "white",
  },
};

export default function RootLayout() {
  return (
    <ThemeProvider value={theme}>
      <Slot />
    </ThemeProvider>
  );
}