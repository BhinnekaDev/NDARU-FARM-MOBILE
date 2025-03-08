import { TouchableOpacity, Text } from "react-native";
import { ButtonProps } from "@/interfaces/ButtonProps";

const Button = ({ children = "", className, type = "button" }: ButtonProps) => {
  return (
    <TouchableOpacity className={`h-10 px-6 rounded-md bg-black justify-center items-center ${className ?? ""}`}>
      <Text className="text-white text-base font-semibold">{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
