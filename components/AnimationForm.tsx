import React, { useState, useRef } from "react";
import { View, TextInput, Animated, useColorScheme } from "react-native";

// OUR INTERFACES
import { AnimateFormProps } from "@/interfaces/AnimationFormProps";

const AnimateForm = ({ label, value, onChangeText }: AnimateFormProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className={`border-b ${isDarkMode ? "border-white" : "border-black"} relative`}>
      {/* Animated Label */}
      <Animated.Text
        style={{
          position: "absolute",
          left: 0,
          fontSize: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [18, 14],
          }),
          top: animatedLabel.interpolate({
            inputRange: [0, 1],
            outputRange: [5, -15],
          }),
          color: isFocused ? (isDarkMode ? "white" : "black") : "gray", // Warna menyesuaikan mode
          fontWeight: "bold",
        }}
      >
        {label}
      </Animated.Text>

      {/* Text Input */}
      <TextInput
        className="text-white text-lg h-10 pb-1" //
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default AnimateForm;
