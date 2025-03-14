import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        switch (route.name) {
          case "home":
            iconName = "home-outline";
            break;
          case "cart":
            iconName = "cart-outline";
            break;
          case "favorite":
            iconName = "star-outline";
            break;
          case "profile":
            iconName = "person-outline";
            break;
          default:
            iconName = "ellipse-outline";
        }

        return {
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={iconName} //
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="favorite" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
