import { View, Animated } from "react-native";
// HOOKS
import { useThemeListener } from "@/hooks/Frontend/useThemeListener";
import { useStartScreenAnimation } from "@/hooks/Frontend/startScreen/useStartAnimation";
// COMPONENTS
import MyButton from "@/components/button";
// INTERFACES
import { StartScreenProps } from "@/interfaces/screenProps";

export default function StartScreen({ onExit }: StartScreenProps) {
  const theme = useThemeListener("start");
  const anim = useStartScreenAnimation();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <View className="w-full h-1/2 mb-32">
        {/* Gambar Latar Belakang */}
        <Animated.Image
          source={theme.startImage}
          style={{
            width: "200%",
            height: "160%",
            transform: [
              { translateX: anim.translateXAnim },
              { translateY: anim.translateYAnim },
              { scale: anim.scaleAnim },
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
            opacity: anim.lettuceOpacity,
            transform: [{ translateX: anim.lettuceTranslateX }],
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
            opacity: anim.textOpacity,
            transform: [{ translateX: anim.textTranslateX }],
            color: theme.text,
          }}
        >
          Dapatkan produk{"\n"}dari pertanian lokal{"\n"}dengan cepat dan mudah
        </Animated.Text>

        {/* Teks Deskripsi Kecil */}
        <Animated.Text
          className="text-lg mt-2"
          style={{
            fontFamily: "LexRegular",
            opacity: anim.descOpacity,
            transform: [{ translateX: anim.descTranslateX }],
            color: theme.text,
          }}
        >
          Beli produk segar untuk hidangan Anda pada aplikasi Anda
        </Animated.Text>

        <Animated.View
          style={{
            transform: [{ translateY: anim.buttonTranslateY }],
            opacity: anim.buttonOpacity,
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
            onPress={() => anim.handleOutAnimation(onExit)}
          />
        </Animated.View>
      </View>
    </View>
  );
}
