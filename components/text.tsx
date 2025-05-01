import React from "react";
import { Text as RNText, useColorScheme } from "react-native";
// INTERFACES
import { MyTextProps } from "@/interfaces/textProps";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

const MyText = ({ children, fontFamily = "LexBold", fontSize = 14, color, textstyle }: MyTextProps) => {
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();

  if (!fontLoaded) {
    return null;
  }

  const textColor = color || (colorScheme === "dark" ? "white" : "black");

  return (
    <RNText style={[{ fontFamily, fontSize, color: textColor }]} className={textstyle}>
      {children}
    </RNText>
  );
};

export default MyText;
