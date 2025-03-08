import { useEffect } from "react";
import { View, Text, Animated } from "react-native";

export default function SplashScreenComponent() {
  const scaleAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);
  const textScaleAnim = new Animated.Value(1);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 5,
        duration: 2000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(textScaleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, []);

  return (
    <View className="flex-1 bg-white justify-center items-center p-10">
      <Animated.Image
        source={require("@/assets/images/splash/splash1.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          transform: [{ scale: scaleAnim }],
        }}
      />
      <Animated.Text
        className="text-5xl font-bold text-white absolute"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: textScaleAnim }],
        }}
      >
        NDARU FARM
      </Animated.Text>
    </View>
  );
}
