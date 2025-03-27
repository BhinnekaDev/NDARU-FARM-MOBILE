import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { buttonBackProps } from "@/interfaces/buttonBackProps";

export default function MyButtonBack({
  onPress,
  myClassName,
  mySize,
  myColor,
  myActiveOpacity,
}: buttonBackProps) {
  const theme = useColorScheme();
  const defaultColor = theme === "dark" ? "white" : "black";

  return (
    <TouchableOpacity
      activeOpacity={myActiveOpacity}
      className={myClassName}
      onPress={onPress}
    >
      <Ionicons
        name="arrow-undo"
        size={mySize}
        color={myColor || defaultColor}
      />
    </TouchableOpacity>
  );
}
