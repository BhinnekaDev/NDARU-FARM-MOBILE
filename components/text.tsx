import React from "react";
import { Text as RNText, useColorScheme } from "react-native";
// INTERFACES
import { MyTextProps } from "@/interfaces/textProps";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

<<<<<<< HEAD
const MyText: React.FC<MyTextProps> = ({
  children,
  fontFamily = "LexBold",
  fontSize = 14,
  color,
  textstyle,
  style,
}) => {
=======
const MyText = ({ children, fontFamily = "LexBold", fontSize = 14, color, textstyle }: MyTextProps) => {
>>>>>>> bhinnekadev24/bhi-158-implementasi-frontend-fitur-keranjang-untuk-menambahkan
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();

  if (!fontLoaded) {
    return null;
  }

  const textColor = color || (colorScheme === "dark" ? "white" : "black");

  return (
<<<<<<< HEAD
    <RNText
      style={[
        {
          fontFamily,
          fontSize,
          color: textColor,
        },
        style,
      ]}
      className={textstyle}
    >
=======
    <RNText style={[{ fontFamily, fontSize, color: textColor }]} className={textstyle}>
>>>>>>> bhinnekadev24/bhi-158-implementasi-frontend-fitur-keranjang-untuk-menambahkan
      {children}
    </RNText>
  );
};

export default MyText;
