import React from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions } from "react-native";

interface TabBarProps {
  tabs: string[];
  activeTab: number;
  onTabPress: (index: number) => void;
  translateX: Animated.Value;
}

const { width } = Dimensions.get("window");

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabPress, translateX }) => {
  const tabWidth = width / tabs.length;

  return (
    <View className="relative w-full h-12 border-b-2 flex-row">
      {/* Animated Indicator */}
      <View className="absolute bottom-0 w-full h-[5%] bg-gray-600">
        <Animated.View
          style={{
            position: "absolute",
            width: tabWidth,
            height: "60%",
            backgroundColor: "white",
            transform: [{ translateX }],
          }}
        />
      </View>

      {/* Tab Items */}
      {tabs.map((title, index) => (
        <TouchableOpacity key={index} className="flex-1 justify-center items-center" onPress={() => onTabPress(index)}>
          <Text className={activeTab === index ? "text-white font-bold text-lg" : "text-gray-400 text-lg"}>{title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabBar;
