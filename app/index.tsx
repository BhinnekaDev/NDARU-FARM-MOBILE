import { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet } from "react-native";
// SCREENS
import SplashScreenComponent from "@/app/screens/splashScreen";
import StartScreen from "@/app/screens/startScreen";
import SelectScreen from "@/app/screens/selectScreen";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isStartVisible, setIsStartVisible] = useState(true);
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  // Efek Animasi untuk Splash Screen
  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start(() => {
        setIsSplashVisible(false);
      });
    }, 3000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Menampilkan Start Screen */}
      {isStartVisible && (
        <StartScreen
          onExit={() => {
            setIsStartVisible(false);
            setIsSelectVisible(true);
          }}
        />
      )}

      {/* Menampilkan SelectScreen */}
      {isSelectVisible && <SelectScreen />}

      {/* Menampilkan Splash Screen */}
      {isSplashVisible && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "#093731", opacity: fadeAnim },
          ]}
        >
          <SplashScreenComponent />
        </Animated.View>
      )}
    </View>
  );
}
