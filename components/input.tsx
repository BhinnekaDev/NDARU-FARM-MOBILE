import { TextInput, View } from "react-native";
import * as Icons from "@expo/vector-icons";
import { ComponentType } from "react";
// INTERFACEs
import { inputProps } from "@/interfaces/inputProps";
// HOOKS
import { useLoadFont } from "@/hooks/ClientSide/useLoadFonts";

export default function MyInput({
  myClassName,
  type,
  placeholder,
  iconLibrary,
  icon,
  iconColor,
  iconSize,
  placeholderFont,
  inputFontSize,
}: inputProps) {
  const loadedFont = useLoadFont();
  const fontToUse = typeof loadedFont === "string" ? loadedFont : undefined;
  const IconComponent = Icons[
    iconLibrary as keyof typeof Icons
  ] as ComponentType<any>;

  return (
    <View className="bg-transparent flex-row items-center border-b border-black px-3">
      {icon && IconComponent && (
        <IconComponent
          name={icon}
          size={iconSize}
          color={iconColor}
          className="mr-3"
        />
      )}

      <TextInput
        placeholder={placeholder}
        style={{
          fontFamily: placeholderFont || fontToUse,
          fontSize: inputFontSize,
        }}
        secureTextEntry={type === "password"}
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
    </View>
  );
}
