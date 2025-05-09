import React, { useRef } from "react";
import { ScrollView, TouchableOpacity, useColorScheme } from "react-native";
// COMPONENTS
import MyText from "@/components/text";
// INTERFACES
import { MyButtonCategoryProps } from "@/interfaces/buttonCategoryProps";

const defaultCategories = ["Semua", "Sayuran", "Jasa", "Berita", "Sarana Pertanian"];

const MyButtonCategory = ({
  selectedCategory, //
  onSelectCategory,
  hideCategories = [],
  ScrollStyle,
}: MyButtonCategoryProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const scrollRef = useRef<ScrollView>(null);

  const filteredCategories = defaultCategories.filter((category) => !hideCategories.includes(category));

  const buttonRefs = useRef<React.RefObject<React.ElementRef<typeof TouchableOpacity>>[]>(filteredCategories.map(() => React.createRef<React.ElementRef<typeof TouchableOpacity>>()));

  const handleCategoryPress = (category: string, index: number) => {
    onSelectCategory(category);

    buttonRefs.current[index].current?.measureLayout(scrollRef.current as any, (x: number) => {
      scrollRef.current?.scrollTo({ x, animated: true });
    });
  };

  return (
    <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} className={`flex-row ${ScrollStyle || ""}`}>
      {filteredCategories.map((category, index) => {
        const isSelected = selectedCategory === category;

        return (
          <TouchableOpacity
            key={index}
            ref={buttonRefs.current[index]}
            onPress={() => handleCategoryPress(category, index)}
            activeOpacity={0.8}
            className={`px-4 py-2 rounded-full ${isSelected ? (isDarkMode ? "bg-[#333836]" : "bg-[#093731]") : ""}`}
          >
            <MyText fontSize={14} fontFamily={isSelected ? "LexBold" : "LexMedium"} color={isSelected ? "#FFF" : isDarkMode ? "#FFF" : "#000"}>
              {category}
            </MyText>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default MyButtonCategory;
