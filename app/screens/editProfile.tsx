import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// OUR COMPONENT
import Button from "@/components/ButtonProfile";

export default function Index() {
  const router = useRouter();
  const handleBackToProfile = () => {
    router.push("/(tabs)/profile");
  };
  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* Container Foto Profil */}
      <View className="w-36 h-36 rounded-full border-4 border-gray-500 flex items-center justify-center mt-10 overflow-hidden">
        <Image source={{ uri: "https://i.pravatar.cc/180" }} className="w-full h-full" />
      </View>
      <Text className="text-white text-xl font-bold mt-4">Adrian Musa Alfauzanss</Text>
      <Text className="text-gray-400 text-lg underline">emailPengguna@gmail.com</Text>

      {/* Edit Profile Button */}
      <Button
        textClassName="text-white font-semibold" //
        className="mt-8 bg-[#333836] px-6 py-2 rounded-lg"
        onPress={handleBackToProfile}
      >
        Back
      </Button>
    </View>
  );
}
