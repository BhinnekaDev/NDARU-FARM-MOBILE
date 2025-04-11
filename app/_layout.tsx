import "@/global.css";
import { Stack } from "expo-router";
<<<<<<< HEAD
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { statusBarLightTheme, statusBarDarkTheme } from "@/constant/theme";

export default function RootLayout() {
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();

  if (!fontLoaded) {
    return null;
  }

  const theme =
    colorScheme === "dark" ? statusBarDarkTheme : statusBarLightTheme;

  return (
    <>
      <StatusBar
        backgroundColor={theme.background}
        style={colorScheme === "dark" ? "light" : "dark"}
      />

=======
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
