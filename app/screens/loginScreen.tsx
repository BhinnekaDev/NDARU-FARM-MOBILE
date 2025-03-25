import { View, Animated, Text } from "react-native";
import { useRouter } from "expo-router";
// COMPONENTS
import MyButton from "@/components/button";
import MyButtonBack from "@/components/buttonBack";
import MyInput from "@/components/input";
// INTERFACES
import { LoginScreenProps } from "@/interfaces/screenProps";
// HOOKS
import useRegisterLoginAnimations from "@/hooks/Frontend/registerLoginScreen/useRegisterLoginAnimations";
import { useThemeListener } from "@/hooks/Frontend/useThemeListener";

export default function LoginScreen({ onBack }: LoginScreenProps) {
  const router = useRouter();
  const theme = useThemeListener("login");

  const {
    buttonBackTranslateX,
    buttonBackOpacity,
    translateXAnim,
    translateYAnim,
    farmerTranslateY,
    farmerOpacity,
    itemOpacity,
    buttonOpacity,
  } = useRegisterLoginAnimations(false);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
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
          onPress={onBack}
        />
      </Animated.View>

      <View className="w-full h-1/2 absolute">
        {/* Gambar Shape */}
        <Animated.Image
          source={theme.registerLoginImage}
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
          source={require("@/assets/images/registerLogin/farmer.png")}
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
          <View
            className="h-px w-full"
            style={{ backgroundColor: theme.text }}
          />
          <Text style={{ fontFamily: "LexSemiBold", color: theme.text }}>
            Atau
          </Text>
          <View
            className="h-px w-full"
            style={{ backgroundColor: theme.text }}
          />
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
            myTouchStyle="gap-4"
            myTextStyle="text-xl"
            onPress={() => router.push("/screens/indentityScreen")}
          />
        </Animated.View>
      </View>
    </View>
  );
}
