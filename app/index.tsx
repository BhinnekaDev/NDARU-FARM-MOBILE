<<<<<<< HEAD
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
=======
import { Text, View } from "react-native";
import { useRouter } from "expo-router";

// OUR COMPONENTS
import Button from "@/components/ButtonCustomProfile";

export default function Index() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/screens/editProfile");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl text-black font-semibold">Welcome Everyone 👋</Text>
      <Button
        textClassName="text-white text-base font-semibold" //
        classNameContainer="bg-red-500 font-semibold h-10 px-6 rounded-md justify-center items-center"
        onPress={handleNavigation}
      >
        Go To Profile Dawgs
      </Button>
>>>>>>> bhinnekadev24/bhi-47-pengembangan-halaman-profil-dengan-fitur-sunting-push
    </View>
  );
}
