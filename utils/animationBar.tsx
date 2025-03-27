import { View, Animated } from "react-native";
import { AnimationBarProps } from "@/interfaces/AnimationBarProps";

const animationBar = ({ translateX, tabWidth }: AnimationBarProps) => (
  <View className="absolute bottom-0 w-full h-[5%] bg-gray-600">
    <Animated.View
      style={{
        position: "absolute",
        width: tabWidth,
        height: "60%", //
        backgroundColor: "white",
        transform: [{ translateX }],
      }}
    />
  </View>
);

export default animationBar;
