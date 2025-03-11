import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { buttonBackProps } from "@/interfaces/buttonBackProps";

export default function MyButtonBack({
  onPress,
  myClassName,
  mySize,
  myColor,
  myActiveOpacity,
}: buttonBackProps) {
  return (
    <TouchableOpacity
      activeOpacity={myActiveOpacity}
      className={myClassName}
      onPress={onPress}
    >
      <Ionicons name="arrow-undo" size={mySize} color={myColor} />
    </TouchableOpacity>
  );
}
