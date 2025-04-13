import React, { useState } from "react";
import * as Icons from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
import { tabsBarLightTheme, tabsBarDarkTheme } from "@/constant/theme";

export default function TabNavigator() {
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();

  const [jumlahNotifikasiPesanan] = useState(3);
  const [jumlahFavoritBaru] = useState(2);

  if (!fontLoaded) {
    return null;
  }

  const theme = colorScheme === "dark" ? tabsBarDarkTheme : tabsBarLightTheme;

  const tabConfig: Record<
    string,
    { library: keyof typeof Icons; name: string; label: string }
  > = {
    home: {
      library: "Ionicons",
      name: "home-outline",
      label: "Beranda",
    },
    order: {
      library: "AntDesign",
      name: "inbox",
      label: "Pesanan",
    },
    favorite: {
      library: "Ionicons",
      name: "star-outline",
      label: "Favorit",
    },
    profile: {
      library: "Ionicons",
      name: "person-outline",
      label: "Profil",
    },
  };

  return (
    <Tabs
      screenOptions={({ route }) => {
        const config = tabConfig[route.name] || {
          library: "Ionicons",
          name: "ellipse-outline",
          label: route.name.charAt(0).toUpperCase() + route.name.slice(1),
        };

        const IconComponent = Icons[config.library];

        let badgeCount: number | undefined = undefined;
        if (route.name === "order" && jumlahNotifikasiPesanan > 0) {
          badgeCount = jumlahNotifikasiPesanan;
        } else if (route.name === "favorite" && jumlahFavoritBaru > 0) {
          badgeCount = jumlahFavoritBaru;
        }

        return {
          tabBarIcon: ({ color, size }) => (
            <IconComponent name={config.name} size={size} color={color} />
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
          tabBarLabel: config.label,
          tabBarBadge: badgeCount,
          tabBarBadgeStyle: {
            backgroundColor: "red",
            color: "white",
            fontSize: 10,
          },
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="order" />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
