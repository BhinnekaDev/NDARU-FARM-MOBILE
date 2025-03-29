import React from "react";
import { View } from "react-native";

// OUR COMPONENT
import AnimateForm from "@/components/AnimationForm";

// OUR INTERFACES
import { EditFormProps } from "@/interfaces/EditFormProps";

const FloatingLabelInput = ({ label, value, onChangeText }: EditFormProps) => {
  return (
    <View className="py-4 w-96">
      <AnimateForm label={label} value={value} onChangeText={onChangeText} />
    </View>
  );
};

export default FloatingLabelInput;
