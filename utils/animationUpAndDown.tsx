import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { AnimationUpAndDownProps } from "@/interfaces/AnimationUpAndDownProps";

const animationUpAndDown = ({ children, isActive, direction = "up" }: AnimationUpAndDownProps) => {
  const translateY = useState(new Animated.Value(direction === "up" ? -50 : 50))[0];
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: isActive ? 0 : direction === "up" ? -50 : 50,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isActive ? 1 : 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [isActive, direction]);

  return <Animated.View style={{ transform: [{ translateY }], opacity }}>{children}</Animated.View>;
};

export default animationUpAndDown;
