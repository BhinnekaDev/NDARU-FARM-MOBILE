import { useState } from "react";
import { TextInput, View, TouchableOpacity } from "react-native";
import * as Icons from "@expo/vector-icons";
import { ComponentType } from "react";
// INTERFACEs
import { inputProps } from "@/interfaces/inputProps";
// HOOKS
import { useLoadFont } from "@/hooks/ClientSide/useLoadFonts";

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
  const loadedFont = useLoadFont();
  const fontToUse = typeof loadedFont === "string" ? loadedFont : undefined;
  const IconComponent = iconLibrary
    ? (Icons[iconLibrary as keyof typeof Icons] as ComponentType<any>)
    : null;
  const RightIconComponent = rightIconLibrary
    ? (Icons[rightIconLibrary as keyof typeof Icons] as ComponentType<any>)
    : null;

  const [secureText, setSecureText] = useState(type === "password");

  return (
    <View className="bg-transparent flex-row items-center border-b border-black px-3">
      {/* Left Icon */}
      {icon && IconComponent && (
        <IconComponent
          name={icon}
          size={iconSize}
          color={iconColor}
          className="mr-3"
        />
      )}

      {/* Input */}
      <TextInput
        placeholder={placeholder}
        style={{
          fontFamily: placeholderFont || fontToUse,
          fontSize: inputFontSize,
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

      {/* Right Icon (Toggle Eye for Password) */}
      {type === "password" && (
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Icons.Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      )}

      {/* Custom Right Icon */}
      {rightIcon && RightIconComponent && !type.includes("password") && (
        <TouchableOpacity onPress={onRightIconPress}>
          <RightIconComponent
            name={rightIcon}
            size={rightIconSize}
            color={rightIconColor}
            className="ml-3"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
