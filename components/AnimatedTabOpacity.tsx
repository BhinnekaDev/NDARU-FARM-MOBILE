import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import { AnimationProps } from "@/interfaces/AnimationProps";

const AnimatedTabOpacity = ({ children, isActive }: AnimationProps) => {
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
};

export default AnimatedTabOpacity;
