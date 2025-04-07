import { useRef } from "react";
import { Animated, useColorScheme } from "react-native";

export default function useHomeInterpolate(colorScheme: string) {
  const theme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;

  const fontSizeAnim = scrollY.interpolate({
    inputRange: [130, 140],
    outputRange: [32, 20],
    extrapolate: "clamp",
  });

  const textDecsOpacity = scrollY.interpolate({
    inputRange: [60, 70],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 50, 50],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 90, 110],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const searchScale = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 1],
    extrapolate: "clamp",
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [140, 150],
    outputRange: [
      useColorScheme() === "dark" ? "rgba(19,21,20,0)" : "rgba(255,255,255,0)",
      useColorScheme() === "dark" ? "#131514" : "white",
    ],
    extrapolate: "clamp",
  }); 
  

  const headerBorderWidth = scrollY.interpolate({
    inputRange: [150, 160],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerTextOpacity = scrollY.interpolate({
    inputRange: [0, 49, 50],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const headerSearchOpacity = scrollY.interpolate({
    inputRange: [0, 110, 125],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const headerCategoryOpacity = scrollY.interpolate({
    inputRange: [0, 150, 170],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const CategoryOpacity = scrollY.interpolate({
    inputRange: [0, 150, 160],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  return {
    scrollY,
    fontSizeAnim,
    textDecsOpacity,
    textOpacity,
    searchOpacity,
    searchScale,
    headerBackgroundColor,
    headerBorderWidth,
    headerTextOpacity,
    headerSearchOpacity,
    headerCategoryOpacity,
    CategoryOpacity,
  };
}
