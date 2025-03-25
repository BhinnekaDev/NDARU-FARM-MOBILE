import React from "react";
import { TextInput, View, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// INTERFACES
import { MySearchProps } from "@/interfaces/searchProps";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

const MySearch: React.FC<MySearchProps> = ({ placeholder = "Cari..." }) => {
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  if (!fontLoaded) return null;

  return (
    <View
      className={`flex-row items-center px-6 rounded-2xl h-10 ${
        isDarkMode ? "bg-[#333836]" : "bg-[#093731]"
      }`}
    >
      <Ionicons
        name="search-outline"
        size={20}
        color={isDarkMode ? "#FFF" : "white"}
      />
      <TextInput
        className="flex-1 ml-3 text-base"
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? "#CCC" : "white"}
        style={{
          fontFamily: "LexMedium",
          color: "white",
        }}
      />
    </View>
  );
};

export default MySearch;
