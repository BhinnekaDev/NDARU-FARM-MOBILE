import { View, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
// COMPONENTS
import MyButton from "@/components/button";
// INTERFACES
import { StartScreenProps } from "@/interfaces/screenProps";

export default function StartScreen({ onExit }: StartScreenProps) {
  const [isAnimExit, setIsAnimExit] = useState(false);

  // FUngsi Animasi
  const scaleAnim = useRef(new Animated.Value(5)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const lettuceTranslateX = useRef(new Animated.Value(300)).current;
  const lettuceOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateX = useRef(new Animated.Value(-100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateX = useRef(new Animated.Value(-100)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Efek Animasi
  useEffect(() => {
    // Animasi Shape
    if (!isAnimExit) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        delay: 2300,
        duration: 1400,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(translateYAnim, {
        toValue: -120,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(translateXAnim, {
        toValue: 90,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Animasi Lettuce
      Animated.parallel([
        Animated.timing(lettuceTranslateX, {
          toValue: 0,
          delay: 3500,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(lettuceOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();

      // Animasi Text
      Animated.timing(textTranslateX, {
        toValue: 0,
        delay: 4000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(textOpacity, {
        toValue: 1,
        delay: 4000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Animasi Deskripsi
      Animated.timing(descTranslateX, {
        toValue: 0,
        delay: 4200,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
      Animated.timing(descOpacity, {
        toValue: 1,
        delay: 4200,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Animasi Tombol
      Animated.timing(buttonTranslateY, {
        toValue: 0,
        delay: 4400,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(buttonOpacity, {
        toValue: 1,
        delay: 4400,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [isAnimExit]);

  // Fungsi Tombol Animasi Keluar
  const handleOutAnimation = () => {
    setIsAnimExit(true);

    Animated.parallel([
      Animated.timing(textTranslateX, {
        toValue: -100,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(descTranslateX, {
        toValue: -100,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(descOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonTranslateY, {
        toValue: 100,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.parallel([
        Animated.timing(lettuceTranslateX, {
          toValue: 300,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(lettuceOpacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        onExit();
      });
    });
  };

  return (
    <View className="flex-1">
      <View className="w-full h-1/2 mb-32">
        {/* Gambar Latar Belakang */}
        <Animated.Image
          source={require("@/assets/images/starts/start1.png")}
          style={{
            width: "200%",
            height: "160%",
            transform: [
              { translateX: translateXAnim },
              { translateY: translateYAnim },
              { scale: scaleAnim },
            ],
          }}
          resizeMode="cover"
        />

        {/* Gambar Selada */}
        <Animated.Image
          className="absolute top-0 left-32"
          style={{
            width: "150%",
            height: "120%",
            opacity: lettuceOpacity,
            transform: [{ translateX: lettuceTranslateX }],
          }}
          source={require("@/assets/images/starts/lettuce.png")}
        />
      </View>

      <View className="w-full h-full px-4">
        {/* Teks Header Besar */}
        <Animated.Text
          className="text-3xl"
          style={{
            fontFamily: "LexBold",
            opacity: textOpacity,
            transform: [{ translateX: textTranslateX }],
          }}
        >
          Dapatkan produk{"\n"}dari pertanian lokal{"\n"}dengan cepat dan mudah
        </Animated.Text>

        {/* Teks Deskripsi Kecil */}
        <Animated.Text
          className="text-lg mt-2"
          style={{
            fontFamily: "LexRegular",
            opacity: descOpacity,
            transform: [{ translateX: descTranslateX }],
          }}
        >
          Beli produk segar untuk hidangan Anda pada aplikasi Anda
        </Animated.Text>

        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          }}
          className="w-full p-3 mt-12"
        >
          {/* Tombol ke halaman Select Screen dengan Animasi Out */}
          <MyButton
            fontFamily="LexBold"
            title="Mulai"
            myActiveOpacity={1}
            myClassName="p-3 rounded-xl"
            myTextStyle="text-lg"
            onPress={handleOutAnimation}
          />
        </Animated.View>
      </View>
    </View>
  );
}
