import React from "react";
import { View, Text, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingOptionProps } from "@/interfaces/ButtonSwitchProfileProps";

const SettingOption = ({
  iconName,
  label,
  value,
  onToggle,
  containerClassName = "",
  labelClassName = "",
  iconClassName = "",
  dividerClassName = "",
  trackColorFalse = "#000000", // Hitam (Default)
  trackColorTrue = "#00822F", // hijau Tua (Default)
  thumbColorOn = "#FFFFFF", // Putih (default)
  thumbColorOff = "#f4f3f4", // Abu Muda (Default)
}: SettingOptionProps) => {
  return (
    <View className={containerClassName}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <MaterialIcons name={iconName} size={24} color="white" className={iconClassName} />
          <Text className={labelClassName}>{label}</Text>
        </View>
        <Switch
          trackColor={{ false: trackColorFalse, true: trackColorTrue }}
          thumbColor={value ? thumbColorOn : thumbColorOff}
          ios_backgroundColor="#3e3e3e"
          style={[{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }]}
          value={value}
          onValueChange={onToggle}
        />
      </View>
      <View className={dividerClassName} />
    </View>
  );
};

export default SettingOption;
