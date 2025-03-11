import { View, Animated, Easing } from "react-native";
import { useEffect, useRef, useState } from "react";
// COMPONENTS
import MyButton from "@/components/button";
// INTERFACES
import { SelectScreenProps } from "@/interfaces/screenProps";

export default function SelectScreen({
  toRegister,
  toLogin,
}: SelectScreenProps) {
  const [isAnimExit, setIsAnimExit] = useState(false);
  const [destination, setDestination] = useState<"register" | "login" | null>(
    null
  );

  // Fungsi Animasi
  const translateYAnim = useRef(new Animated.Value(-120)).current;
  const translateXAnim = useRef(new Animated.Value(90)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const farmerTranslateY = useRef(new Animated.Value(-60)).current;
  const farmerOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(-60)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const descTranslateY = useRef(new Animated.Value(-50)).current;
  const descOpacity = useRef(new Animated.Value(0)).current;
  const buttonTranslateY = useRef(new Animated.Value(100)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  //   Efek Animasi
  useEffect(() => {
    if (!isAnimExit) {
      // Efek Animasi Shape Select
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -300,
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

      // Efek Animasi Teks
      Animated.timing(textTranslateY, {
        toValue: 0,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(textOpacity, {
        toValue: 1,
        delay: 1000,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      // Efek Animasi Teks Deskripsi
      Animated.timing(descTranslateY, {
        toValue: 0,
        delay: 1200,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      Animated.timing(descOpacity, {
        toValue: 1,
        delay: 1200,
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

  // Fungsi Tombol Animasi Keluar
  const handleOutAnimation = (target: "register" | "login") => {
    setIsAnimExit(true);
    setDestination(target);

    // Animasi Farmer
    Animated.parallel([
      Animated.timing(farmerTranslateY, {
        toValue: -60,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(farmerOpacity, {
        toValue: 0,
        duration: 600,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();

    // Animasi Teks
    Animated.timing(textTranslateY, {
      toValue: -50,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
    Animated.timing(textOpacity, {
      toValue: 0,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Animasi Teks Deskripsi
    Animated.timing(descTranslateY, {
      toValue: -50,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
    Animated.timing(descOpacity, {
      toValue: 0,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();

    // Animasi Tombol
    Animated.timing(buttonTranslateY, {
      toValue: 50,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();
    Animated.timing(buttonOpacity, {
      toValue: 0,
      duration: 600,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (target === "register") {
        toRegister();
      } else {
        toLogin();
      }
    }, 800);
  };

  //   Interpolasi Farmer
  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-10deg"],
  });

  return (
    <View className="flex-1">
      <View className="w-full h-1/2 mb-8">
        {/* Gambar Shape */}
        <Animated.Image
          source={require("@/assets/images/select/select1.png")}
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
          className="absolute top-[46px] left-5"
          style={{
            width: "80%",
            height: "80%",
            opacity: farmerOpacity,
            transform: [{ translateY: farmerTranslateY }],
          }}
          source={require("@/assets/images/select/farmer.png")}
        />
      </View>

      <View className="w-full h-full px-4">
        {/* Teks Header Besar */}
        <Animated.Text
          className="text-4xl text-center"
          style={{
            fontFamily: "LexBold",
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
          }}
        >
          Temukan Sayuran Segar Disini
        </Animated.Text>

        {/* Teks Deskripsi Kecil */}
        <Animated.Text
          className="text-lg text-center mt-4"
          style={{
            fontFamily: "LexRegular",
            opacity: descOpacity,
            transform: [{ translateY: descTranslateY }],
          }}
        >
          Belanja sayuran segar langsung dari kebun, {"\n"}
          praktis dan berkualitas untuk kebutuhan dapur Anda!
        </Animated.Text>

        {/* Tombol */}
        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }],
            opacity: buttonOpacity,
          }}
          className="w-full p-3 mt-12 flex flex-row justify-center items-center"
        >
          {/* Tombol ke halaman Register Screen */}
          <MyButton
            fontFamily="LexBold"
            title="Daftar"
            myActiveOpacity={0.9}
            myClassName="w-1/2 rounded-tl-xl rounded-bl-xl py-5"
            myTextStyle="text-xl"
            onPress={() => handleOutAnimation("register")}
          />
          {/* Tombol ke halaman Login Screen */}
          <MyButton
            fontFamily="LexBold"
            title="Masuk"
            myActiveOpacity={1}
            myClassName="w-1/2 rounded-tr-xl rounded-br-xl py-5"
            myTextStyle="text-xl"
            myButtonColor="#093731"
            onPress={() => handleOutAnimation("login")}
          />
        </Animated.View>
      </View>
    </View>
  );
}
