import { useState } from "react";
import * as Icons from "@expo/vector-icons";
import { TouchableOpacity, Text, Animated } from "react-native";
import { ComponentType } from "react";
// HOOKS
import { useLoadFont } from "@/hooks/ClientSide/useLoadFonts";
// INTERFACES
import { buttonProps } from "@/interfaces/buttonProps";

export default function MyButton({
  title,
  fontFamily,
  myActiveOpacity,
  myClassName,
  myTextStyle,
  myButtonColor = "#159778",
  onPress,
  icon,
  iconLibrary,
  iconSize,
  iconColor,
  iconPosition,
}: buttonProps) {
  const fontLoaded = useLoadFont();
  const [isPressed, setIsPressed] = useState(false);
  const backgroundColor = useState(new Animated.Value(0))[0];

  if (!fontLoaded) {
    return null;
  }

  const IconComponent = Icons[
    iconLibrary as keyof typeof Icons
  ] as ComponentType<any>;

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
    outputRange: [myButtonColor, "#161E1B"],
  });

  return (
    // Tombol
    <Animated.View
      className={myClassName}
      style={{ backgroundColor: interpolatedColor }}
    >
      <TouchableOpacity
        className="w-full flex-row justify-center items-center gap-3"
        activeOpacity={myActiveOpacity}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        {icon && iconPosition === "left" && IconComponent && (
          <IconComponent
            name={icon}
            size={iconSize}
            color={iconColor}
            style={{ marginRight: 8 }}
          />
        )}
        <Text style={{ fontFamily }} className={`text-white ${myTextStyle}`}>
          {title}
        </Text>
        {icon && iconPosition === "right" && IconComponent && (
          <IconComponent name={icon} size={iconSize} color={iconColor} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
