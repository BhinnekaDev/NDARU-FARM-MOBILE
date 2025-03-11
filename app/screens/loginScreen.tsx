import { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, Text } from "react-native";
import { useRouter } from "expo-router";
// COMPONENTS
import MyButton from "@/components/button";
import MyButtonBack from "@/components/buttonBack";
import MyInput from "@/components/input";
// INTERFACES
import { LoginScreenProps } from "@/interfaces/screenProps";

export default function LoginScreen({ onBack }: LoginScreenProps) {
  const router = useRouter();
  const [isAnimExit] = useState(false);

  // Fungsi Animasi
  const translateYAnim = useRef(new Animated.Value(-300)).current;
  const translateXAnim = useRef(new Animated.Value(-150)).current;
  const rotateAnim = useRef(new Animated.Value(0.3)).current;
  const buttonBackTranslateX = useRef(new Animated.Value(-100)).current;
  const buttonBackOpacity = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(-60)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const itemOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  //   Efek Animasi
  useEffect(() => {
    if (!isAnimExit) {
      // Efek Animasi Shape
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -120,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateXAnim, {
          toValue: 130,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Efek Animasi Tombol Back
      Animated.parallel([
        Animated.timing(buttonBackTranslateX, {
          toValue: 0,
          delay: 1000,
          duration: 800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonBackOpacity, {
          toValue: 1,
          delay: 1000,
          duration: 800,
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

      //   Efek Animasi Item
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

  return (
    <View className="flex-1">
      {/* Tombol Kembali */}
      <Animated.View
        style={{
          opacity: buttonBackOpacity,
          transform: [{ translateX: buttonBackTranslateX }],
        }}
        className="absolute top-12 left-5 z-10"
      >
        <MyButtonBack
          myActiveOpacity={0.5}
          myClassName="p-4"
          mySize={30}
          myColor="black"
          onPress={onBack}
        />
      </Animated.View>

      <View className="w-full h-1/2 absolute">
        {/* Gambar Shape */}
        <Animated.Image
          source={require("@/assets/images/register/register1.png")}
          style={{
            width: "200%",
            height: "160%",
            transform: [
              { translateX: translateXAnim },
              { translateY: translateYAnim },
            ],
          }}
          resizeMode="cover"
        />

        {/* Gambar Farmer */}
        <Animated.Image
          className="absolute top-[46px] left-0"
          style={{
            width: "100%",
            height: "130%",
            opacity: farmerOpacity,
            transform: [{ translateY: farmerTranslateY }],
          }}
          source={require("@/assets/images/register/farmer.png")}
        />
      </View>

      <View className="w-full h-full px-6 gap-6 justify-center mt-36">
        {/* Input */}
        <Animated.View className="gap-7" style={{ opacity: itemOpacity }}>
          {/* Input Nomor Telepon */}
          <MyInput
            type="number"
            icon="phone"
            iconLibrary="MaterialCommunityIcons"
            iconSize={30}
            placeholder="Nomor Telepon"
            placeholderFont="LexSemiBold"
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

          {/* Tombol untuk Login */}
          <Animated.View
            style={{
              opacity: buttonOpacity,
            }}
            className="w-full mt-8"
          >
            <MyButton
              fontFamily="LexBold"
              title="Masuk"
              myActiveOpacity={0.9}
              myClassName="w-full rounded-xl py-3"
              myTextStyle="text-xl"
            />
          </Animated.View>
        </Animated.View>

        {/* HR Pembatas */}
        <Animated.View
          style={{ opacity: itemOpacity }}
          className="flex-row justify-center items-center mx-28 my-4"
        >
          <View className="h-px w-full bg-black" />
          <Text style={{ fontFamily: "LexSemiBold" }}>Atau</Text>
          <View className="h-px w-full bg-black" />
        </Animated.View>

        {/* Tombol untuk Masuk dengan Google */}
        <Animated.View
          style={{
            opacity: buttonOpacity,
          }}
          className="w-full mt-2"
        >
          <MyButton
            title="Masuk Dengan Google"
            icon="google"
            iconColor="white"
            iconSize={20}
            iconLibrary="FontAwesome5"
            iconPosition="left"
            fontFamily="LexBold"
            myActiveOpacity={0.9}
            myClassName="w-full rounded-xl py-3"
            myTextStyle="text-xl"
            onPress={() => router.push("/screens/indentityScreen")}
          />
        </Animated.View>
      </View>
    </View>
  );
}
