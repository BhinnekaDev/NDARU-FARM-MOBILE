import { useRef, useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

export default function useSelectScreenAnimation() {
  const [isAnimExit, setIsAnimExit] = useState(false);
  const [destination, setDestination] = useState<"register" | "login" | null>(null);

  // Refs Animasi
  const translateYAnim = useRef(new Animated.Value(-120)).current;
  const translateXAnim = useRef(new Animated.Value(90)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(-60)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(-60)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(-50)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Animasi Masuk
  useEffect(() => {
    if (!isAnimExit) {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -300,
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
        Animated.timing(textTranslateY, {
          toValue: 0,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(descTranslateY, {
          toValue: 0,
          delay: 1200,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          delay: 1200,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isAnimExit]);

  // Animasi Keluar
  const handleOutAnimation = (target: "register" | "login", callback: () => void) => {
    setIsAnimExit(true);
    setDestination(target);

    Animated.parallel([
      Animated.timing(farmerTranslateY, {
        toValue: -60,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(farmerOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: -50,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(descTranslateY, {
        toValue: -50,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(descOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 50,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
    });
  };

  return {
    rotateAnim,
    translateYAnim,
    translateXAnim,
    farmerTranslateY,
    farmerOpacity,
    textTranslateY,
    textOpacity,
    descTranslateY,
    descOpacity,
    buttonTranslateY,
    buttonOpacity,
    handleOutAnimation,
  };
}
