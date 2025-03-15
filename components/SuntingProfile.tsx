import React from "react";
import { View, Text } from "react-native";
import { SuntingProfileProps } from "@/interfaces/SuntingProfileProps";
import Button from "@/components/ButtonProfile";

const SuntingProfile = ({ label, text, onPress, iconComponent }: SuntingProfileProps) => {
  return (
    <View className="flex-row items-center justify-between py-2   ">
      {/* Teks di Kiri */}
      <Text className="text-white font-semibold text-lg">{label}</Text>

      {/* Sunting Profil & Tombol */}
      <View className="flex-row justify-end items-center space-x-10 ">
        <Text className="text-white font-bold text-lg pr-4">{text}</Text>
        <Button classNameContainer=" px-2 py-2 rounded-lg" textClassName="text-white font-semibold" onPress={onPress}>
          {iconComponent}
        </Button>
      </View>
    </View>
  );
};

export default SuntingProfile;
