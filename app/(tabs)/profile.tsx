import "@/global.css";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";
import SettingOption from "@/components/ButtonSwitch";
export default function Index() {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);
  const router = useRouter();
  const handleNavigation = () => {
    router.push("/");
  };
  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* Container Foto Profil */}
      <View className="w-36 h-36 rounded-full border-4 border-gray-500 flex items-center justify-center mt-10 overflow-hidden">
        <Image source={{ uri: "https://i.pravatar.cc/180" }} className="w-full h-full" />
      </View>
      <Text className="text-white text-xl font-bold mt-4">Adrian Musa Alfauzan</Text>
      <Text className="text-gray-400 text-lg underline">emailPengguna@gmail.com</Text>

      {/* Edit Profile Button */}
      <Button
        textClassName="text-white font-semibold" //
        className="mt-8 bg-[#333836] px-6 py-2 rounded-lg"
      >
        Sunting Profile
      </Button>

      {/* Settings Options */}
      <View className="w-full px-6 mt-8 ">
        <Text className="text-white text-lg font-bold mb-2">Pilihan Pengaturan</Text>
        <View className="bg-[#333836] p-4  rounded-lg ">
          {/* Opsi Notifikasi */}
          <SettingOption
            iconName="notifications" //
            label="Notifikasi"
            value={isNotificationEnabled}
            onToggle={setNotificationEnabled}
            containerClassName=""
            iconClassName=""
            labelClassName=""
            dividerClassName=""
          />

          {/* Opsi Sidik Jari */}
          <SettingOption
            iconName="fingerprint" //
            label="Sidik Jari Biometri"
            value={isBiometricEnabled}
            onToggle={setBiometricEnabled}
            containerClassName=""
            iconClassName=""
            labelClassName=""
            dividerClassName=""
          />

          {/* Opsi Keluar */}
          <TouchableOpacity className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center">
              <MaterialIcons name="logout" size={24} color="white" className="bg-black p-1 rounded-lg" />
              <Text className="text-white ml-4">Keluar</Text>
            </View>
          </TouchableOpacity>
          <View className="border-b border-white" />
        </View>
      </View>
      <Button
        textClassName="text-white text-base font-semibold" //
        className="bg-green-500 font-semibold h-10 px-6 rounded-md  justify-center items-center"
        onPress={handleNavigation}
      >
        Go To Home Dawg
      </Button>
    </View>
  );
}
