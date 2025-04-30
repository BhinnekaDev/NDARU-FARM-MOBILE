import React, { useState, useRef } from "react";
import { View, TextInput, Animated, useColorScheme, Text } from "react-native";

// OUR INTERFACES
import { AnimateFormProps } from "@/interfaces/AnimationFormProps";

const AnimateForm = ({
  label, //
  value,
  onChangeText,
  withAnimated = true,
  withBorder = true,
}: AnimateFormProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    if (withAnimated) {
      Animated.timing(animatedLabel, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      if (withAnimated) {
        Animated.timing(animatedLabel, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    }
  };

  return (
    <View className={`relative ${withBorder ? (isDarkMode ? "border-b border-white" : "border-b border-black") : ""}`}>
      {/* Label */}
      {withAnimated ? (
        <Animated.Text
          style={{
            fontFamily: "LexSemiBold",
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
            color: isFocused ? (isDarkMode ? "white" : "black") : "gray",
          }}
        >
          {label}
        </Animated.Text>
      ) : (
        <Text
          style={{
            fontFamily: "LexSemiBold",
            fontSize: 18,
            marginBottom: 4,
            color: isDarkMode ? "white" : "black",
          }}
        >
          {label}
        </Text>
      )}

      {/* Text Input */}
      <TextInput
        className={`${isDarkMode ? "text-white" : "text-black"} text-lg h-10 pb-1`} //
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
};

export default AnimateForm;
