import { useColorScheme } from "react-native";
import { useRef, useEffect, useState } from "react";
import { Animated } from "react-native";

export const useVegetableAnimations = (scrollY: Animated.Value) => {
  const colorScheme = useColorScheme() ?? "light";
  const [isTextVisible, setIsTextVisible] = useState(false);

  const buttonBackOpacity = scrollY.interpolate({
    inputRange: [380, 400],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const buttonBackOpacityFirst = scrollY.interpolate({
    inputRange: [50, 100, 405, 405],
    outputRange: [0, 1, 1, 0],
    extrapolate: "clamp",
  });

  const buttonBackTranslateYFirst = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [-50, 0],
    extrapolate: "clamp",
  });

  const backgroundColor = scrollY.interpolate({
    inputRange: [390, 400],
    outputRange: [colorScheme === "dark" ? "rgba(19, 21, 20, 0)" : "rgba(255, 255, 255, 0)", colorScheme === "dark" ? "rgba(19, 21, 20, 1)" : "rgba(255, 255, 255, 1)"],
    extrapolate: "clamp",
  });

  const textHeaderTranslateY = scrollY.interpolate({
    inputRange: [380, 400],
    outputRange: [-10, 0],
    extrapolate: "clamp",
  });

  const textHeaderOpacity = scrollY.interpolate({
    inputRange: [380, 400],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const textRatingStatsTranslateY = scrollY.interpolate({
    inputRange: [400, 420],
    outputRange: [-10, 0],
    extrapolate: "clamp",
  });

  const textRatingStatsOpacity = scrollY.interpolate({
    inputRange: [400, 420],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const bottomBarIconLeftOpacity = scrollY.interpolate({
    inputRange: [620, 690],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const bottomBarIconRightOpacity = scrollY.interpolate({
    inputRange: [630, 660],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const bottomButtonBarOpacity = scrollY.interpolate({
    inputRange: [620, 690],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const bottomBarTranslateY = scrollY.interpolate({
    inputRange: [620, 690],
    outputRange: [30, 0],
    extrapolate: "clamp",
  });

  const bottomBarOpacity = scrollY.interpolate({
    inputRange: [620, 690],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const bottomBackgroundColor = scrollY.interpolate({
    inputRange: [620, 690],
    outputRange: [colorScheme === "dark" ? "#33383610" : "#00000010", colorScheme === "dark" ? "#333836" : "#000000"],
    extrapolate: "clamp",
  });

  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const translateXIcon = useRef(new Animated.Value(0)).current;
  const buttonWidth = useRef(new Animated.Value(60)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  const fadeOutOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeInOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(translateXIcon, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(buttonWidth, {
          toValue: 180,
          duration: 500,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {
      setIsTextVisible(true);
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        startExitAnimation();
      }, 2000);
    });
  }, []);

  const startExitAnimation = () => {
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setIsTextVisible(false);
      Animated.parallel([
        Animated.timing(buttonWidth, {
          toValue: 60,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(translateXIcon, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        Animated.timing(fadeOutOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    });
  };

  return {
    scrollY,
    buttonBackOpacity,
    buttonBackOpacityFirst,
    buttonBackTranslateYFirst,
    backgroundColor,
    textHeaderTranslateY,
    textHeaderOpacity,
    textRatingStatsTranslateY,
    textRatingStatsOpacity,
    bottomBarIconLeftOpacity,
    bottomBarIconRightOpacity,
    bottomButtonBarOpacity,
    bottomBarTranslateY,
    bottomBarOpacity,
    bottomBackgroundColor,
    fadeInOpacity,
    translateXIcon,
    buttonWidth,
    textOpacity,
    fadeOutOpacity,
    isTextVisible,
    startExitAnimation,
  };
};
