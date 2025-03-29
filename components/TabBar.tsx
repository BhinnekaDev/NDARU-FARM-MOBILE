import React, { useRef } from "react";
import { View, Animated, Dimensions, Easing } from "react-native";
import AnimationBar from "@/utils/animationBar";
import ButtonBar from "@/components/ButtonCustomProfile";
import { TabBarProps } from "@/interfaces/TabBarProps";

const TabBar = ({
  activeTab, //
  setActiveTab,
  tabs = [],
}: TabBarProps) => {
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
    <View className="relative w-full h-12 border-b-2 flex-row">
      <AnimationBar translateX={translateX} tabWidth={tabWidth} />
      {tabs.map((title, index) => (
        <ButtonBar key={index} classNameContainer="flex-1 justify-center items-center" textClassName={activeTab === index ? "text-white font-bold text-lg" : "text-gray-400 text-lg"} onPress={() => handleTabPress(index)}>
          {title}
        </ButtonBar>
      ))}
    </View>
  );
};

export default TabBar;
