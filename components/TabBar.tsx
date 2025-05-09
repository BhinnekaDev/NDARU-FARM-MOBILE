import React, { useRef } from "react";
import { View, Animated, Dimensions, Easing, useColorScheme } from "react-native";

// OUR COMPONENTS
import ButtonBar from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { TabBarProps } from "@/interfaces/TabBarProps";

// OUR UTILS
import AnimationBar from "@/utils/animationBar";

const TabBar = ({
  activeTab, //
  setActiveTab,
  tabs = [],
}: TabBarProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const { width } = Dimensions.get("window");
  const tabWidth = width / tabs.length;
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Animated.timing(translateX, {
      toValue: index * tabWidth,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="relative w-full h-12  flex-row">
      <AnimationBar translateX={translateX} tabWidth={tabWidth} />
      {tabs.map((title, index) => (
        <ButtonBar
          key={index} //
          classNameContainer="flex-1 justify-center items-center"
          textClassName={` text-lg ${activeTab === index ? (isDarkMode ? "text-white" : "text-black") : "text-gray-600"}`}
          textStyle={{ fontFamily: "LexXBold" }}
          onPress={() => handleTabPress(index)}
        >
          {title}
        </ButtonBar>
      ))}
    </View>
  );
};

export default TabBar;
