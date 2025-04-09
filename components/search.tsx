import React from "react";
import { View, useColorScheme, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// ICONS
import { Ionicons } from "@expo/vector-icons";
// INTERFACES
import { MySearchProps } from "@/interfaces/searchProps";
// HOOKS
import { useLoadFont } from "@/hooks/Frontend/useLoadFonts";

const MySearch: React.FC<MySearchProps> = () => {
  const router = useRouter();
  const fontLoaded = useLoadFont();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  if (!fontLoaded) return null;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push("/screens/searchScreen")}
    >
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
        <Text
          className="flex-1 ml-3 text-base"
          style={{
            fontFamily: "LexMedium",
            color: isDarkMode ? "#CCC" : "white",
          }}
        >
          Cari ...
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MySearch;
