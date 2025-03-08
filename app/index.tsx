import { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import SplashScreenComponent from "@/app/screens/splashScreen";
import StartScreen from "@/app/screens/startScreen";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(1)).current; // Opacity SplashScreen (mulai dari 1)

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0, // Menghilangkan SplashScreen secara perlahan
        duration: 0, // Waktu animasi 0.8 detik
        useNativeDriver: true,
      }).start();
    }, 3000); // SplashScreen tampil selama 3 detik sebelum fade-out
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* StartScreen langsung muncul */}
      <StartScreen />

      {/* Animasi SplashScreen fade-out di atas StartScreen */}
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "#093731", opacity: fadeAnim },
        ]}
      >
        <SplashScreenComponent />
      </Animated.View>
    </View>
  );
}
