import { TouchableOpacity, Text } from "react-native";

// OUR INTERFACES
import { ButtonProps } from "@/interfaces/ButtonCustomProfileProps";

const ButtonProfile = ({ children = "", classNameContainer = "", textClassName = "", onPress, styleButton, textStyle }: ButtonProps) => {
  return (
    /* Button Custom Profile Component */
    <TouchableOpacity activeOpacity={0.7} className={classNameContainer} onPress={onPress} style={styleButton}>
      <Text className={textClassName} style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonProfile;
