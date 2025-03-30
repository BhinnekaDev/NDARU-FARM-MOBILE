import { TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { buttonBackProps } from "@/interfaces/buttonBackProps";

interface MyButtonBackProps extends buttonBackProps {
  style?: ViewStyle;
}

export default function MyButtonBack({
  onPress,
  myClassName,
  mySize,
  myColor,
  myActiveOpacity,
  style,
  iconStyle,
}: MyButtonBackProps) {
  const theme = useColorScheme();
  const defaultColor = theme === "dark" ? "white" : "black";

  return (
    <TouchableOpacity
      activeOpacity={myActiveOpacity}
      className={myClassName}
      onPress={onPress}
      style={[style]}
    >
      <Ionicons
        name="arrow-undo"
        size={mySize}
        color={myColor || defaultColor}
        style={[iconStyle]}
      />
    </TouchableOpacity>
  );
}
