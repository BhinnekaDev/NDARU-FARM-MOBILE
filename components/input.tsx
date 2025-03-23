import { useState, useRef } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  useColorScheme,
  Animated,
} from "react-native";
import * as Icons from "@expo/vector-icons";
import { ComponentType } from "react";
// INTERFACEs
import { inputProps } from "@/interfaces/inputProps";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

export default function MyInput({
  myClassName,
  type = "text",
  placeholder,
  iconLibrary,
  icon,
  iconColor,
  iconSize,
  rightIcon,
  rightIconLibrary,
  rightIconColor,
  rightIconSize,
  onRightIconPress,
  placeholderFont,
  inputFontSize,
}: inputProps) {
  const theme = useColorScheme();
  const defaultColor = theme === "dark" ? "white" : "black";
  const loadedFont = useLoadFont();
  const fontToUse = typeof loadedFont === "string" ? loadedFont : undefined;
  const IconComponent = iconLibrary
    ? (Icons[iconLibrary as keyof typeof Icons] as ComponentType<any>)
    : null;
  const RightIconComponent = rightIconLibrary
    ? (Icons[rightIconLibrary as keyof typeof Icons] as ComponentType<any>)
    : null;

  const [secureText, setSecureText] = useState(type === "password");
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const togglePasswordVisibility = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.8,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    setSecureText(!secureText);
  };

  return (
    <View
      className={`flex-row items-center border-b px-3 ${
        theme === "dark" ? "border-white" : "border-black"
      }`}
    >
      {/* Left Icon */}
      {icon && IconComponent && (
        <IconComponent
          name={icon}
          size={iconSize}
          color={iconColor || defaultColor}
          className="mr-3"
        />
      )}

      {/* Input */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={defaultColor}
        style={{
          fontFamily: placeholderFont || fontToUse,
          fontSize: inputFontSize,
          color: defaultColor,
        }}
        secureTextEntry={type === "password" ? secureText : false}
        keyboardType={
          type === "email"
            ? "email-address"
            : type === "number"
            ? "numeric"
            : "default"
        }
        inputMode={type === "number" ? "numeric" : "text"}
        className={`flex-1 ${myClassName}`}
      />

      {/* Icon Mata Toggle dengan Animasi */}
      {type === "password" && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Icons.Ionicons
              name={secureText ? "eye-off" : "eye"}
              size={24}
              color={defaultColor}
            />
          </Animated.View>
        </TouchableOpacity>
      )}

      {/* Custom Right Icon */}
      {rightIcon && RightIconComponent && !type.includes("password") && (
        <TouchableOpacity onPress={onRightIconPress}>
          <RightIconComponent
            name={rightIcon}
            size={rightIconSize}
            color={rightIconColor || defaultColor}
            className="ml-3"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
