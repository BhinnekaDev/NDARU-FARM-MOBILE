import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

export default function useIdentityAnimations() {
  const [isAnimExit] = useState(false);

  // State animasi
  const translateYAnim = useRef(new Animated.Value(-120)).current;
  const translateXAnim = useRef(new Animated.Value(90)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(-60)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isAnimExit) {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -200,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: -150,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0.3,
          duration: 1000,
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

      Animated.timing(buttonTranslateY, {
        toValue: 0,
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

  // Interpolasi rotasi gambar
  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-10deg"],
  });

  return {
    translateYAnim,
    translateXAnim,
    rotateInterpolation,
    farmerTranslateY,
    farmerOpacity,
    itemOpacity,
    buttonTranslateY,
    buttonOpacity,
  };
}
