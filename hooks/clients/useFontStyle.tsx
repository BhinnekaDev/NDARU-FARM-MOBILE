import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function useFontStyle() {
  const [fontReady, setFontReady] = useState(false);

  const [fontsLoaded] = useFonts({
    "Lexend-Black": require("@/assets/fonts/Lexend-Black.ttf"),
    "Lexend-Bold": require("@/assets/fonts/Lexend-Bold.ttf"),
    "Lexend-Regular": require("@/assets/fonts/Lexend-Regular.ttf"),
    "Lexend-SemiBold": require("@/assets/fonts/Lexend-SemiBold.ttf"),
    "Lexend-ExtraBold": require("@/assets/fonts/Lexend-ExtraBold.ttf"),
    "Lexend-Medium": require("@/assets/fonts/Lexend-Medium.ttf"),
  });

  useEffect(() => {
    async function siap() {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
        setFontReady(true);
      }
    }
    siap();
  }, [fontsLoaded]);

  return fontReady;
}
