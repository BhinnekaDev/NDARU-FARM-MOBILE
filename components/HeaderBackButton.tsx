import React from "react";
import { View, Text, useColorScheme } from "react-native";

// OUR COMPONENT
import Button from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { HeaderBackButtonProps } from "@/interfaces/HeaderBackButton";

export default function HeaderBackButton({
  title, //
  onPress,
  icon,
}: HeaderBackButtonProps) {
  const darkMode = useColorScheme();
  const isDarkMode = darkMode === "dark";
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
      <Text className={`${isDarkMode ? "text-white" : "text-black"} font-bold ml-2 text-lg`}>{title}</Text>
    </View>
  );
}
