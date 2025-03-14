import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const iconName = route.name === "Profile" ? "person-outline" : "home-outline"; // Default ke "home-outline" jika tidak cocok

        return {
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={iconName as keyof typeof Ionicons.glyphMap} //
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "red",
          headerShown: false,
        };
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
