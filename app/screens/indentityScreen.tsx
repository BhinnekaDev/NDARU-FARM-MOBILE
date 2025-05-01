import { View, Animated } from "react-native";
import { useRouter } from "expo-router";
// HOOKS
import useIdentityAnimations from "@/hooks/Frontend/identityScreen/useIdentityAnimations";
import { useThemeListener } from "@/hooks/Frontend/useThemeListener";
// COMPONENTS
import MyButton from "@/components/button";
import MyInput from "@/components/input";

export default function IdentityScreen() {
  const router = useRouter();
  const theme = useThemeListener("identity");

  const {
    translateYAnim,
    translateXAnim,
    rotateInterpolation,
    farmerTranslateY,
    farmerOpacity,
    itemOpacity,
    buttonTranslateY,
    buttonOpacity,
  } = useIdentityAnimations();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="w-full h-1/2">
        {/* Gambar Shape */}
        <Animated.Image
          source={theme.identityImage}
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
          className="text-3xl text-center mb-8"
          style={{
            fontFamily: "LexBold",
            opacity: itemOpacity,
            color: theme.text,
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
            onPress={() => router.replace("/(tabs)/home")}
          />
        </Animated.View>
      </View>
    </View>
  );
}
