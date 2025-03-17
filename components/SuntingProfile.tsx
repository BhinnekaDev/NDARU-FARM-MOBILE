import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SuntingProfileProps } from "@/interfaces/SuntingProfileProps";
import ButtonProfile from "@/components/ButtonProfile";

const SuntingProfile = ({
  label,
  text,
  onPress,
  iconComponent,
  isWrapperButton = false,
  labelClassName = "text-white font-semibold text-lg", //
}: SuntingProfileProps) => {
  const WrapperButton = isWrapperButton ? TouchableOpacity : View;

  return (
    <WrapperButton onPress={isWrapperButton ? onPress : undefined} className="flex-row items-center justify-between py-2">
      {/* Gunakan labelClassName */}
      <Text className={labelClassName}>{label}</Text>

      <View className="flex-row items-center space-x-2">
        <Text className="text-white font-bold text-lg pr-4">{text}</Text>
        <ButtonProfile classNameContainer="px-2 py-2 rounded-lg" textClassName="text-white font-semibold" onPress={onPress}>
          {iconComponent}
        </ButtonProfile>
      </View>
    </WrapperButton>
  );
};

export default SuntingProfile;
