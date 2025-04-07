import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { tabsBarLightTheme, tabsBarDarkTheme } from "@/constant/theme";

export default function TabNavigator() {
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();

  if (!fontLoaded) {
    return null;
  }

  const theme = colorScheme === "dark" ? tabsBarDarkTheme : tabsBarLightTheme;

  return (
    <Tabs
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        let labelName: string =
          route.name.charAt(0).toUpperCase() + route.name.slice(1);

        switch (route.name) {
          case "home":
            iconName = "home-outline";
            labelName = "Home";
            break;
          case "cart":
            iconName = "cart-outline";
            labelName = "Cart";
            break;
          case "favorite":
            iconName = "star-outline";
            labelName = "Favorite";
            break;
          case "profile":
            iconName = "person-outline";
            labelName = "Profile";
            break;
          default:
            iconName = "ellipse-outline";
        }

        return {
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: theme.iconActive,
          tabBarInactiveTintColor: theme.iconInActive,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            height: 60,
            borderTopWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            fontFamily: "LexSemiBold",
          },
          tabBarLabel: labelName,
        };
      }}
    >
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="cart" options={{ tabBarLabel: "Cart" }} />
      <Tabs.Screen name="favorite" options={{ tabBarLabel: "Favorites" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
}
