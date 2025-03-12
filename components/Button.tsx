import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/interfaces/ButtonProps";

const Button = ({ children = "", className = "", onPress }: ButtonProps) => {
  return (
    /* Button Component */
    <TouchableOpacity className={`h-10 px-6 rounded-md bg-black justify-center items-center ${className}`} onPress={onPress}>
      <Text className="text-white text-base font-semibold">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
