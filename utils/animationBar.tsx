import { View, Animated, useColorScheme } from "react-native";
import { AnimationBarProps } from "@/interfaces/AnimationBarProps";

const AnimationBar = ({ translateX, tabWidth }: AnimationBarProps) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "4%",
        backgroundColor: isDarkMode ? "#333836" : "#159778", // Latar belakang hijau saat terang, gelap saat mode gelap
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          width: tabWidth,
          height: "100%",
          backgroundColor: isDarkMode ? "#FFFFFF" : "#000000", // Warna bar aktif putih saat gelap, hitam saat terang
          transform: [{ translateX }],
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default AnimationBar;
