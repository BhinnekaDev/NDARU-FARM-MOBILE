import React from "react";
import { View } from "react-native";

// OUR COMPONENTS
import AnimateForm from "@/components/AnimationForm";

// OUR INTERFACES
import { EditFormProps } from "@/interfaces/EditFormProps";

const FloatingLabelInput = ({
  label, //
  value,
  onChangeText,
  withAnimated = true,
  withBorder = true,
}: EditFormProps) => {
  return (
    <View className="py-4 w-96">
      <AnimateForm
        label={label} //
        value={value}
        onChangeText={onChangeText}
        withAnimated={withAnimated}
        withBorder={withBorder}
      />
    </View>
  );
};

export default FloatingLabelInput;
