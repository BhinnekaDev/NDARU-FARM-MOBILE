// YANG BARU

import React, { useRef, useEffect, useState } from "react";
import { View, Animated, useColorScheme } from "react-native";
import ButtonBar from "@/components/ButtonCustomProfile";
import { TabBarProps } from "@/interfaces/TabBarProps";

const TabBar = ({ activeTab, setActiveTab, tabs = [] }: TabBarProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const [tabLayouts, setTabLayouts] = useState<{ width: number; x: number }[]>([]);
  const translateX = useRef(new Animated.Value(0)).current;
  const indicatorWidth = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    if (tabLayouts[index]) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: tabLayouts[index].x,
          duration: 250,
          useNativeDriver: false, // ✅ fix di sini juga
        }),
        Animated.timing(indicatorWidth, {
          toValue: tabLayouts[index].width,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const onTabLayout = (event: any, index: number) => {
    const { width, x } = event.nativeEvent.layout;
    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = { width, x };
      return next;
    });
  };

  useEffect(() => {
    if (tabLayouts[activeTab]) {
      translateX.setValue(tabLayouts[activeTab].x);
      indicatorWidth.setValue(tabLayouts[activeTab].width);
    }
  }, [tabLayouts]);

  return (
    <View style={{ position: "relative", flexDirection: "row", height: 48 }}>
      {tabs.map((title, index) => (
        <View key={index} onLayout={(e) => onTabLayout(e, index)} style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 10 }}>
          <ButtonBar onPress={() => handleTabPress(index)} textClassName={`text-lg ${activeTab === index ? (isDarkMode ? "text-white" : "text-black") : "text-gray-600"}`} textStyle={{ fontFamily: "LexXBold" }}>
            {title}
          </ButtonBar>
        </View>
      ))}

      {/* INDICATOR BAR */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 0,
          height: 3,
          backgroundColor: isDarkMode ? "#FFFFFF" : "#000000",
          borderRadius: 2,
          transform: [{ translateX }],
          width: indicatorWidth,
        }}
      />
    </View>
  );
};

export default TabBar;
