import React from "react";
import { View, Text, Switch, useColorScheme } from "react-native";

// OUR INTERFACES
import { ButtonSwitchProfileProps } from "@/interfaces/ButtonSwitchProfileProps";

const ButtonSwitchProfile = ({
  iconComponent,
  label,
  value,
  onToggle,
  containerClassName = "",
  labelClassName = "",
  dividerClassName = "",
  backgroundCircleButtonOn = "",
  backgroundButtonOn = "",
  backgroundCircleButtonOff = "",
  backgroundButtonOff = "",
}: ButtonSwitchProfileProps) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <View className={containerClassName}>
      <View className="flex-row justify-between items-center">
        {/* ICON & LABEL */}
        <View className="flex-row items-center">
          {iconComponent}
          <Text className={`${labelClassName || (isDarkMode ? "text-white font-semibold" : "text-black font-semibold")}  text-lg ml-4`}>{label}</Text>
        </View>

        {/* BUTTON SWITCH */}
        <Switch
          trackColor={{ false: backgroundButtonOff || "#000000", true: backgroundButtonOn || "#00822F" }}
          thumbColor={value ? backgroundCircleButtonOn || "#FFFFFF" : backgroundCircleButtonOff || "#f4f3f4"}
          ios_backgroundColor={backgroundButtonOff || isDarkMode ? "#000000" : "white"}
          style={[{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }]}
          value={value}
          onValueChange={onToggle}
        />
      </View>

      {/* BORDER BOTTOM */}
      <View className={dividerClassName} />
    </View>
  );
};

export default ButtonSwitchProfile;
