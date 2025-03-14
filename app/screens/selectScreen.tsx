import { View, Animated } from "react-native";
// COMPONENTS
import MyButton from "@/components/button";
// INTERFACES
import { SelectScreenProps } from "@/interfaces/screenProps";
// HOOKS
import useSelectScreenAnimation from "@/hooks/Frontend/selectScreen/useSelectAnimation";
import { useThemeListener } from "@/hooks/Frontend/useThemeListener";

export default function SelectScreen({
  toRegister,
  toLogin,
}: SelectScreenProps) {
  const theme = useThemeListener("select");

  const {
    rotateAnim,
    translateYAnim,
    translateXAnim,
    farmerTranslateY,
    farmerOpacity,
    textTranslateY,
    textOpacity,
    descTranslateY,
    descOpacity,
    buttonTranslateY,
    buttonOpacity,
    handleOutAnimation,
  } = useSelectScreenAnimation();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="w-full h-1/2 mb-8">
        {/* Gambar Shape */}
        <Animated.Image
          source={theme.selectImage}
          style={{
            width: "200%",
            height: "160%",
            transform: [
              { translateX: translateXAnim },
              { translateY: translateYAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "-10deg"],
                }),
              },
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
            color: theme.text,
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
            color: theme.text,
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
            myButtonColor={theme.mode === "dark" ? "#161E1B" : undefined}
            onPress={() => handleOutAnimation("register", toRegister)}
          />

          {/* Tombol ke halaman Login Screen */}
          <MyButton
            fontFamily="LexBold"
            title="Masuk"
            myActiveOpacity={1}
            myClassName="w-1/2 rounded-tr-xl rounded-br-xl py-5"
            myTextStyle="text-xl"
            myButtonColor={theme.mode === "light" ? "#093731" : undefined}
            onPress={() => handleOutAnimation("login", toLogin)}
          />
        </Animated.View>
      </View>
    </View>
  );
}
