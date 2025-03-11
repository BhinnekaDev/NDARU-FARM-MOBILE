import { View, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
// COMPONENTS
import MyButton from "@/components/button";
import MyInput from "@/components/input";

export default function IdentityScreen() {
  const [isAnimExit, setIsAnimExit] = useState(false);

  // Fungsi Animasi
  const translateYAnim = useRef(new Animated.Value(-120)).current;
  const translateXAnim = useRef(new Animated.Value(90)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(-60)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  //   Efek Animasi
  useEffect(() => {
    if (!isAnimExit) {
      // Efek Animasi Shape Select
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -200,
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

      // Efek Animasi Farmer
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
      ]).start();

      // Efek Animasi Item
      Animated.timing(itemOpacity, {
        toValue: 1,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Efek Animasi Tombol
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(buttonOpacity, {
        toValue: 1,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimExit]);

  //   Interpolasi Farmer
  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-10deg"],
  });

  return (
    <View className="flex-1">
      <View className="w-full h-1/2">
        {/* Gambar Shape */}
        <Animated.Image
          source={require("@/assets/images/identity/identity1.png")}
          style={{
            width: "200%",
            height: "160%",
            transform: [
              { translateX: translateXAnim },
              { translateY: translateYAnim },
              { rotate: rotateInterpolation },
            ],
          }}
          resizeMode="cover"
        />

        {/* Gambar Farmer */}
        <Animated.Image
          className="absolute top-0 left-0"
          style={{
            width: "100%",
            height: "100%",
            opacity: farmerOpacity,
            transform: [{ translateY: farmerTranslateY }],
          }}
          source={require("@/assets/images/identity/farmer.png")}
        />
      </View>

      <View className="w-full h-full px-4">
        {/* Teks Header Besar */}
        <Animated.Text
          className="text-3xl text-center text-white mb-8"
          style={{
            fontFamily: "LexBold",
            opacity: itemOpacity,
          }}
        >
          Lengkapi Identitas Anda
        </Animated.Text>

        {/* Input */}
        <Animated.View className="gap-7" style={{ opacity: itemOpacity }}>
          {/* Input Nama Lengkap */}
          <MyInput
            type="text"
            placeholder="Nama Lengkap"
            placeholderFont="LexSemiBold"
            icon="user-alt"
            iconLibrary="FontAwesome5"
            iconSize={28}
            inputFontSize={20}
          />
          {/* Input Kata Sandi */}
          <MyInput
            type="password"
            icon="lock"
            iconLibrary="Entypo"
            iconSize={30}
            placeholder="Kata Sandi"
            placeholderFont="LexSemiBold"
            inputFontSize={20}
          />
          {/* Input Konfirmasi Kata Sandi */}
          <MyInput
            type="password"
            icon="lock"
            iconLibrary="Entypo"
            iconSize={30}
            placeholder="Konfirmasi Kata Sandi"
            placeholderFont="LexSemiBold"
            inputFontSize={20}
          />
        </Animated.View>

        {/* Tombol Lanjutkan */}
        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          }}
          className="w-full p-3 mt-12 flex flex-row justify-center items-center"
        >
          <MyButton
            fontFamily="LexBold"
            title="Lanjutkan"
            myActiveOpacity={0.9}
            myClassName="w-full rounded-xl py-3"
            myTextStyle="text-xl"
          />
        </Animated.View>
      </View>
    </View>
  );
}
