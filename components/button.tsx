import { useState } from "react";
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
}: buttonProps) {
  const fontLoaded = useLoadFont();
  const theme = useColorScheme();
  const [isPressed, setIsPressed] = useState(false);
  const backgroundColor = useState(new Animated.Value(0))[0];

  if (!fontLoaded) {
    return null;
  }

  const IconComponent = Icons[
    iconLibrary as keyof typeof Icons
  ] as ComponentType<any>;

  const myButtonColorBright = "#159778";
  const myButtonColorDark = "#333836";

  const defaultButtonColor =
    myButtonColor ||
    (theme === "dark" ? myButtonColorDark : myButtonColorBright);

  // Fungsi Mengubah Warna BG Tombol
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

  // Interpolasi Warna BG Tombol
  const interpolatedColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: [defaultButtonColor, "#161E1B"],
  });

  return (
    // Tombol
    <Animated.View
      className={myClassName}
      style={{ backgroundColor: interpolatedColor }}
    >
      <TouchableOpacity
        className={`w-full flex-row justify-center items-center ${myTouchStyle}`}
        activeOpacity={myActiveOpacity}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {buttonType === "icon" &&
          icon &&
          iconPosition === "left" &&
          IconComponent && (
            <IconComponent name={icon} size={iconSize} color={iconColor} />
          )}

        <Text style={{ fontFamily }} className={`text-white ${myTextStyle}`}>
          {title}
        </Text>

        {buttonType === "icon" &&
          icon &&
          iconPosition === "right" &&
          IconComponent && (
            <IconComponent
              name={icon}
              size={iconSize}
              color={iconColor}
              style={{ marginLeft: 8 }}
            />
          )}
      </TouchableOpacity>
    </Animated.View>
  );
}
