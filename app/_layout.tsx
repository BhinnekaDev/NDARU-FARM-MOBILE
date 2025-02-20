import React, { Fragment } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import useFontStyle from "@/hooks/clients/useFontStyle";

export default function RootLayout() {
  const fontReady = useFontStyle();

  if (!fontReady) return null;

  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar barStyle="light-content" backgroundColor="#131514" />
    </Fragment>
  );
}
