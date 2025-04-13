import { useEffect, useState } from "react";
import { Appearance } from "react-native";
// CONSTANTS
import { splashLightTheme, splashDarkTheme, startLightTheme, startDarkTheme, selectLightTheme, selectDarkTheme, registerLoginLightTheme, registerLoginDarkTheme, identityLightTheme, identityDarkTheme } from "@/constant/theme";

type ThemeType = {
  background?: string;
  text?: string;
  mode?: "light" | "dark";
  [key: string]: any;
};

const themes = {
  splash: { light: splashLightTheme, dark: splashDarkTheme },
  start: { light: startLightTheme, dark: startDarkTheme },
  select: { light: selectLightTheme, dark: selectDarkTheme },
  register: { light: registerLoginLightTheme, dark: registerLoginDarkTheme },
  login: { light: registerLoginLightTheme, dark: registerLoginDarkTheme },
  identity: { light: identityLightTheme, dark: identityDarkTheme },
};

export function useThemeListener(screenType: keyof typeof themes) {
  const getTheme = (colorScheme: "light" | "dark" = "light"): ThemeType => {
    return { ...themes[screenType][colorScheme], mode: colorScheme };
  };

  const [theme, setTheme] = useState<ThemeType>(getTheme(Appearance.getColorScheme() ?? "light"));

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setTheme(getTheme(colorScheme));
      }
    });

    return () => subscription.remove();
  }, [screenType]);

  return theme;
}
