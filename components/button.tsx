import { TouchableOpacity, Text, Animated } from "react-native";
import { useState } from "react";
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
}: buttonProps) {
  const fontLoaded = useLoadFont();
  const [isPressed, setIsPressed] = useState(false);
  const backgroundColor = useState(new Animated.Value(0))[0];

  if (!fontLoaded) {
    return null;
  }

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
      className={`rounded-xl ${myClassName}`}
      style={{ backgroundColor: interpolatedColor }}
    >
      <TouchableOpacity
        className="w-full justify-center items-center"
        activeOpacity={myActiveOpacity}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Text style={{ fontFamily }} className={`text-white ${myTextStyle}`}>
          {title}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
