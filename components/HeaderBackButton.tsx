import React from "react";
import { View, Text } from "react-native";

// OUR COMPONENT
import Button from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { HeaderBackButtonProps } from "@/interfaces/HeaderBackButton";

export default function HeaderBackButton({
  title, //
  onPress,
  icon,
}: HeaderBackButtonProps) {
  return (
    <View className="flex-row items-center mt-8 ml-4">
      {/* HEADER BUTTON KEMBALI */}
      <Button
        classNameContainer="px-3 py-2 rounded-lg" //
        textClassName="text-white font-semibold"
        onPress={onPress}
      >
        {icon}
      </Button>

      {/* TITLE HEADER BACK */}
      <Text className="text-white font-bold ml-2 text-lg">{title}</Text>
    </View>
  );
}
