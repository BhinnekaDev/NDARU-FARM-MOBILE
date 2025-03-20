import React from "react";
import { View, Text } from "react-native";
import Button from "@/components/ButtonCustomProfile";
import { HeaderBackButtonProps } from "@/interfaces/HeaderBackButton";

export default function HeaderBackButton({
  title, //
  onPress,
  icon,
}: HeaderBackButtonProps) {
  return (
    <View className="flex-row items-center mt-8 ml-4">
      <Button
        classNameContainer="px-3 py-2 rounded-lg" //
        textClassName="text-white font-semibold"
        onPress={onPress}
      >
        {icon}
      </Button>
      <Text className="text-white font-bold ml-2 text-lg">{title}</Text>
    </View>
  );
}
