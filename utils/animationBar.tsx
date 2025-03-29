import { View, Animated } from "react-native";
import { AnimationBarProps } from "@/interfaces/AnimationBarProps";

const AnimationBar = ({ translateX, tabWidth }: AnimationBarProps) => (
  <View style={{ position: "absolute", bottom: 0, width: "100%", height: "5%", backgroundColor: "#333836" }}>
    <Animated.View
      style={{
        position: "absolute",
        width: tabWidth,
        height: "60%",
        backgroundColor: "white",
        transform: [{ translateX }],
        borderRadius: 10,
      }}
    />
  </View>
);

export default AnimationBar;
