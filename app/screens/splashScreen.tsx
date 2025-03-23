import { View, Animated } from "react-native";
// HOOKS
import { useThemeListener } from "@/hooks/Frontend/useThemeListener";
import { useSplashAnimation } from "@/hooks/Frontend/splashScreen/useSplashAnimation";

export default function SplashScreenComponent() {
  const theme = useThemeListener("splash");
  const { scaleAnim, fadeAnim, textScaleAnim } = useSplashAnimation();

  return (
    <View
      style={{ backgroundColor: theme.background }}
      className="flex-1 justify-center items-center p-10"
    >
      {/* Gambar Splash */}
      <Animated.Image
        source={theme.splashImage}
        style={{
          width: 300,
          height: 300,
          resizeMode: "contain",
          transform: [{ scale: scaleAnim }],
        }}
      />
      {/* Teks Splash */}
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
