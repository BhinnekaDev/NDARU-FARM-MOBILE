import React from "react";
import { Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
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
=======
import { useColorScheme } from "react-native";
import { Tabs } from "expo-router";

export default function TabNavigator() {
  const isDarkMode = useColorScheme() === "dark";
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push

  return (
    <Tabs
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
<<<<<<< HEAD
        let labelName: string =
          route.name.charAt(0).toUpperCase() + route.name.slice(1);
=======
        let labelName: string = route.name.charAt(0).toUpperCase() + route.name.slice(1);
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push

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
<<<<<<< HEAD
            <Ionicons name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: theme.iconActive,
          tabBarInactiveTintColor: theme.iconInActive,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.background,
            height: 60,
=======
            <Ionicons
              name={iconName} //
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: isDarkMode ? "white" : "black",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isDarkMode ? "black" : "white",
            height: 70,
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push
            borderTopWidth: 1,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
<<<<<<< HEAD
            fontFamily: "LexSemiBold",
=======
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push
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
