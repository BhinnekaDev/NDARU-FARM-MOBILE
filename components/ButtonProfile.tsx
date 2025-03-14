import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/interfaces/ButtonProfileProps";

const Button = ({ children = "", className = "", textClassName = "", onPress }: ButtonProps) => {
  return (
    /* Button Component */
    <TouchableOpacity className={className} onPress={onPress}>
      <Text className={textClassName}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
