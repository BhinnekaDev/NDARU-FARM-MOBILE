import { TouchableOpacity, Text } from "react-native";

// OUR INTERFACES
import { ButtonProps } from "@/interfaces/ButtonCustomProfileProps";

const ButtonProfile = ({ children = "", classNameContainer = "", textClassName = "", onPress }: ButtonProps) => {
  return (
    /* Button Custom Profile Component */
    <TouchableOpacity activeOpacity={0.7} className={classNameContainer} onPress={onPress}>
      <Text className={textClassName}>{children}</Text>
    </TouchableOpacity>
  );
};

export default ButtonProfile;
