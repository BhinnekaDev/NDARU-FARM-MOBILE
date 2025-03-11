import { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet } from "react-native";
// SCREENS
import SplashScreenComponent from "@/app/screens/splashScreen";
import StartScreen from "@/app/screens/startScreen";
import SelectScreen from "@/app/screens/selectScreen";
import RegisterScreen from "@/app/screens/registerScreen";
import LoginScreen from "@/app/screens/loginScreen";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [isStartVisible, setIsStartVisible] = useState(true);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

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
      {/* Kondisi Start Screen */}
      {isStartVisible && (
        <StartScreen
          onExit={() => {
            setIsStartVisible(false);
            setIsSelectVisible(true);
          }}
        />
      )}

      {/* Kondisi Select Screen */}
      {isSelectVisible && (
        <SelectScreen
          toRegister={() => {
            setIsSelectVisible(false);
            setIsRegisterVisible(true);
          }}
          toLogin={() => {
            setIsSelectVisible(false);
            setIsLoginVisible(true);
          }}
        />
      )}

      {/* Kondisi Register Screen  */}
      {isRegisterVisible && (
        <RegisterScreen
          onBack={() => {
            setIsRegisterVisible(false);
            setIsSelectVisible(true);
          }}
        />
      )}

      {/* Kondisi Login Screen  */}
      {isLoginVisible && (
        <LoginScreen
          onBack={() => {
            setIsLoginVisible(false);
            setIsSelectVisible(true);
          }}
        />
      )}

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
