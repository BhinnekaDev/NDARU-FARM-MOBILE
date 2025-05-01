import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function useSplashAnimation() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const textScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 5,
        duration: 1100,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1100,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(textScaleAnim, {
        toValue: 0,
        duration: 500,
        delay: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return { scaleAnim, fadeAnim, textScaleAnim };
}
