import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/interfaces/ButtonProfileProps";

const Button = ({ children = "", classNameContainer = "", textClassName = "", onPress }: ButtonProps) => {
  return (
    /* Button Profile Component */
    <TouchableOpacity className={classNameContainer} onPress={onPress}>
      <Text className={textClassName}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
