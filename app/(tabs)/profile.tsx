import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENT
import Button from "@/components/ButtonProfile";
import SettingOption from "@/components/ButtonSwitchProfile";
import UserProfile from "@/components/UserProfile";

export default function Index() {
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);
  const router = useRouter();
  const handleEditProfile = () => {
    router.push("/screens/editProfile");
  };
  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* Container User Profil */}
      <UserProfile
        imageUrl="https://i.pravatar.cc/180" //
        name="Adrian Musa Alfauzan"
        email="emailPengguna@gmail.com"
      />

      {/* Edit Profile Button */}
      <Button
        textClassName="text-white font-semibold" //
        className="mt-8 bg-[#333836] px-6 py-2 rounded-lg"
        onPress={handleEditProfile}
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
          <View className="border-b border-white " />
        </View>
      </View>
    </View>
  );
}
