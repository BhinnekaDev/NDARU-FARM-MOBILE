import React, { useState, useRef } from "react";
import { View, TextInput, Animated } from "react-native";
import { EditFormProps } from "@/interfaces/EditFormProps";

const FloatingLabelInput = ({ label, value, onChangeText }: EditFormProps) => {
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
    <View className="py-4 w-96">
      <View className="border-b border-white relative ">
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
            color: isFocused ? "white" : "gray",
            fontWeight: "bold",
          }}
        >
          {label}
        </Animated.Text>
        <TextInput
          className="text-white text-lg" //
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ height: 40 }}
        />
      </View>
    </View>
  );
};
export default FloatingLabelInput;
