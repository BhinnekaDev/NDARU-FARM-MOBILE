import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { AnimationFadeInFadeOutProps } from "@/interfaces/AnimationFadeInFadeOutProps";

const animationFadeInFadeOut = ({ children, isActive, direction = "in" }: AnimationFadeInFadeOutProps) => {
  const opacity = useState(new Animated.Value(direction === "in" ? 0 : 1))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isActive ? (direction === "in" ? 1 : 0) : direction === "in" ? 0 : 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isActive, direction]);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};

export default animationFadeInFadeOut;
