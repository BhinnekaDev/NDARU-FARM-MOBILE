import React from "react";
import { ScrollView, TouchableOpacity, useColorScheme } from "react-native";
// COMPONENTS
import MyText from "@/components/text";
// INTERFACES
import { MyButtonCategoryProps } from "@/interfaces/buttonCategoryProps";

const categories = ["Semua", "Sayuran", "Jasa", "Berita", "Sarana Pertanian"];

const MyButtonCategory: React.FC<MyButtonCategoryProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row"
    >
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category;

        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelectCategory(category)}
            activeOpacity={0.8}
            className={`px-4 py-2 rounded-full ${
              isSelected ? (isDarkMode ? "bg-[#333836]" : "bg-[#093731]") : ""
            }`}
          >
            <MyText
              fontSize={14}
              fontFamily={isSelected ? "LexBold" : "LexMedium"}
              color={isSelected ? "#FFF" : isDarkMode ? "#FFF" : "#000"}
            >
              {category}
            </MyText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MyButtonCategory;
