import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SuntingProfileProps } from "@/interfaces/SuntingProfileProps";

const SuntingProfile = ({ iconName, label, value, containerStyle = "", labelStyle = "", iconStyle = "", dividerStyle = "" }: SuntingProfileProps) => {
  return (
    <View className={`py-3 px-4 bg-gray-900 rounded-lg ${containerStyle}`}>
      <View className="flex-row justify-between items-center">
        {value && <Text className="text-gray-300">{value}</Text>}
        <View className="flex-row items-center space-x-3">
          <Text className={`text-white text-lg font-medium ${labelStyle}`}>{label}</Text>
          <MaterialIcons name={iconName} size={24} color="white" className={iconStyle} />
        </View>
      </View>
    </View>
  );
};

export default SuntingProfile;
