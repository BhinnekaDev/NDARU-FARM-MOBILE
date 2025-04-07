import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

export function useStartScreenAnimation() {
  const [isAnimExit, setIsAnimExit] = useState(false);

  // Variabel animasi
  const scaleAnim = useRef(new Animated.Value(5)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const lettuceTranslateX = useRef(new Animated.Value(300)).current;
  const lettuceOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateX = useRef(new Animated.Value(-100)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Efek animasi masuk
  useEffect(() => {
    if (!isAnimExit) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        delay: 2300,
        duration: 1400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(translateYAnim, {
        toValue: -120,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(translateXAnim, {
        toValue: 90,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Animasi lainnya
      Animated.parallel([
        Animated.timing(lettuceTranslateX, {
          toValue: 0,
          delay: 3500,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(lettuceOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      Animated.parallel([
        Animated.timing(textTranslateX, {
          toValue: 0,
          delay: 4000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          delay: 4000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(descTranslateX, {
          toValue: 0,
          delay: 4200,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(descOpacity, {
          toValue: 1,
          delay: 4200,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonTranslateY, {
          toValue: 0,
          delay: 4400,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1,
          delay: 4400,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isAnimExit]);

  // Fungsi animasi keluar
  const handleOutAnimation = (callback: () => void) => {
    setIsAnimExit(true);

    Animated.parallel([
      Animated.timing(textTranslateX, {
        toValue: -100,
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
      Animated.timing(descTranslateX, {
        toValue: -100,
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
        toValue: 100,
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
      Animated.parallel([
        Animated.timing(lettuceTranslateX, {
          toValue: 300,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(lettuceOpacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        callback();
      });
    });
  };

  return {
    scaleAnim,
    translateYAnim,
    translateXAnim,
    lettuceTranslateX,
    lettuceOpacity,
    textTranslateX,
    textOpacity,
    descTranslateX,
    descOpacity,
    buttonTranslateY,
    buttonOpacity,
    handleOutAnimation,
  };
}
