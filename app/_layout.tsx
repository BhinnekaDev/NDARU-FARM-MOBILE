import "@/global.css";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
