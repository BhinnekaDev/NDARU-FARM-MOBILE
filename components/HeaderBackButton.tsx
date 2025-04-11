import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// OUR COMPONENTS
import Button from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { HeaderBackButtonProps } from "@/interfaces/HeaderBackButtonProps";

export default function HeaderBackButton({
  title, //
  onPress,
  icon,
}: HeaderBackButtonProps) {
  const isDarkMode = useColorScheme() === "dark";
  const defaultIcon = <Ionicons name="arrow-undo" size={43} color={isDarkMode ? "white" : "black"} />;

  return (
    <View className="flex-row items-center mt-14 ml-4">
      {/* HEADER BUTTON KEMBALI */}
      <Button
        classNameContainer="px-3 py-2 rounded-lg" //
        textClassName="text-white font-semibold"
        onPress={onPress}
      >
        {icon ?? defaultIcon} {/* Gunakan ikon yang diberikan atau default */}
      </Button>

      {/* TITLE HEADER BACK */}
      <Text className={`${isDarkMode ? "text-white" : "text-black"} font-extrabold ml-2 text-2xl`}>{title}</Text>
    </View>
  );
}
