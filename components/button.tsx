import { useState, useRef } from "react";
import * as Icons from "@expo/vector-icons";
import { TouchableOpacity, Text, Animated, useColorScheme } from "react-native";
import { ComponentType } from "react";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";
// INTERFACES
import { buttonProps } from "@/interfaces/buttonProps";

export default function MyButton({
  title,
  fontFamily,
  myActiveOpacity,
  myClassName,
  myTouchStyle,
  myTextStyle,
  myButtonColor,
  onPress,
  icon,
  iconLibrary,
  iconSize,
  iconColor,
  iconPosition,
  buttonType = "default",
  borderColor,
  borderWidth,
  textColor,
  buttonColorType = "type1",
}: buttonProps) {
  const fontLoaded = useLoadFont();
  const theme = useColorScheme();
  const [isPressed, setIsPressed] = useState(false);
  const backgroundColor = useRef(new Animated.Value(0)).current;

  if (!fontLoaded) {
    return null;
  }

  const IconComponent = Icons[iconLibrary as keyof typeof Icons] as ComponentType<any>;

  const myButtonColorBright1 = "#159778";
  const myButtonColorDark1 = "#333836";
  const myButtonColorBright2 = "#159778";
  const myButtonColorDark2 = "#156F32";

  const selectedButtonColor = buttonColorType === "type2" ? (theme === "dark" ? myButtonColorDark2 : myButtonColorBright2) : theme === "dark" ? myButtonColorDark1 : myButtonColorBright1;

  const defaultButtonColor = myButtonColor || selectedButtonColor;

  const computedBorderColor = borderColor === "auto" ? (theme === "dark" ? "#FFF" : "#000") : borderColor !== undefined ? borderColor : "transparent";

  const computedTextColor = textColor !== undefined ? (theme === "dark" ? "#FFF" : "#000") : "#FFF";

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(backgroundColor, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(backgroundColor, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View
      className={myClassName}
      style={{
        backgroundColor: backgroundColor.interpolate({
          inputRange: [0, 1],
          outputRange: [defaultButtonColor, "#161E1B"],
        }),
      }}
    >
      <TouchableOpacity
        className={`w-full flex-row justify-center items-center ${myTouchStyle}`}
        activeOpacity={myActiveOpacity}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{
          borderWidth: borderWidth || 0,
          borderColor: computedBorderColor,
        }}
      >
        {buttonType === "icon" && icon && iconPosition === "left" && IconComponent && <IconComponent name={icon} size={iconSize} color={iconColor} />}

        <Text
          style={{
            fontFamily,
            color: computedTextColor,
          }}
          className={myTextStyle}
        >
          {title}
        </Text>

        {buttonType === "icon" && icon && iconPosition === "right" && IconComponent && <IconComponent name={icon} size={iconSize} color={iconColor} style={{ marginLeft: 8 }} />}
      </TouchableOpacity>
    </Animated.View>
  );
}
