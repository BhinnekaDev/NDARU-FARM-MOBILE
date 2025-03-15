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
  labelClassName = "",
  iconClassName = "",
  dividerClassName = "",
}: SettingOptionProps) => {
  return (
    // Button Switch Profile Component
    <View className={containerClassName}>
      <View className="flex-row justify-between items-center ">
        <View className="flex-row items-center">
          <MaterialIcons name={iconName} size={24} color="white" className={iconClassName} />
          <Text className={labelClassName}>{label}</Text>
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
      <View className={dividerClassName} />
    </View>
  );
};

export default SettingOption;
