import { useEffect } from "react";
import { View, Animated } from "react-native";

export default function SplashScreenComponent() {
  const scaleAnim = new Animated.Value(1);
  const fadeAnim = new Animated.Value(0);
  const textScaleAnim = new Animated.Value(1);

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

  return (
    <View className="flex-1 bg-white justify-center items-center p-10">
      {/* Gambar Splash */}
      <Animated.Image
        source={require("@/assets/images/splash/splash1.png")}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          transform: [{ scale: scaleAnim }],
        }}
      />
      {/* Teks Splash Ndaru */}
      <Animated.Text
        className="text-5xl text-white absolute"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: textScaleAnim }],
          fontFamily: "LexBlack",
        }}
      >
        NDARU FARM
      </Animated.Text>
    </View>
  );
}
