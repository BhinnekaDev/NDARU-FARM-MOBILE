import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export default function useRegisterLoginAnimations(isAnimExit: boolean) {
  const translateYAnim = useRef(new Animated.Value(-300)).current;
  const translateXAnim = useRef(new Animated.Value(-150)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonBackTranslateX = useRef(new Animated.Value(-50)).current;
  const buttonBackOpacity = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(50)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isAnimExit) {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -120,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 130,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      Animated.parallel([
        Animated.timing(buttonBackTranslateX, {
          toValue: 0,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonBackOpacity, {
          toValue: 1,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      Animated.parallel([
        Animated.timing(farmerTranslateY, {
          toValue: 0,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(farmerOpacity, {
          toValue: 1,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      Animated.timing(itemOpacity, {
        toValue: 1,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(buttonOpacity, {
        toValue: 1,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimExit]);

  return {
    buttonBackTranslateX,
    buttonBackOpacity,
    translateXAnim,
    translateYAnim,
    farmerTranslateY,
    farmerOpacity,
    itemOpacity,
    buttonOpacity,
  };
}
