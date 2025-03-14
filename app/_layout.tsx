import "@/global.css";
import { Stack } from "expo-router";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

export default function RootLayout() {
  const fontLoaded = useLoadFont();

  if (!fontLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
