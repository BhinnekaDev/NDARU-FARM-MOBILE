import React from "react";
import { View, Text, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingOptionProps } from "@/interfaces/ButtonSwitchProfileProps";

const SettingOption = ({
  iconName, //
  label,
  value,
  onToggle,
  containerClassName = "",
  iconClassName = "",
  labelClassName = "",
  dividerClassName = "",
}: SettingOptionProps) => {
  return (
    // Button Switch Profile Component
    <View className={`${containerClassName} py-2`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <MaterialIcons name={iconName} size={24} color="white" className={`bg-black p-1 rounded-lg ${iconClassName}`} />
          <Text className={`text-white ml-4 ${labelClassName}`}>{label}</Text>
        </View>
        <Switch
          trackColor={{ false: "#000000", true: "#00822F" }}
          thumbColor={value ? "#FFFFFF" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          style={[{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }]} //
          value={value}
          onValueChange={onToggle}
        />
      </View>
      <View className={`border-b border-white ${dividerClassName}`} />
    </View>
  );
};

export default SettingOption;
