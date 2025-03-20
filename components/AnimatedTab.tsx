import React, { useRef, useEffect } from "react";
import { Animated, Easing, View } from "react-native";
import { AnimationProps } from "@/interfaces/AnimationProps";

const AnimatedTab = ({ children, isActive, direction = "up" }: AnimationProps) => {
  const translateY = useRef(new Animated.Value(isActive ? 0 : 50)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isActive ? 0 : 50, // Geser ke atas saat aktif
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return (
    <View style={{ position: "absolute", width: "100%", height: "100%" }}>
      <Animated.View style={{ transform: [{ translateY }], opacity }}>{children}</Animated.View>
    </View>
  );
};

export default AnimatedTab;
