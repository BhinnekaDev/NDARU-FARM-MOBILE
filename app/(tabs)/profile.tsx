import "@/global.css";
import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "@/components/Button";

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
      <TouchableOpacity className="mt-8 bg-[#333836] px-6 py-2 rounded-lg">
        <Text className="text-white font-semibold">Sunting Profil</Text>
      </TouchableOpacity>

      {/* Settings Options */}
      <View className="w-full px-6 mt-8 ">
        <Text className="text-white text-lg font-bold mb-2">Pilihan Pengaturan</Text>
        <View className="bg-[#333836] p-4  rounded-lg ">
          {/* Opsi Notifikasi */}
          <View>
            <View className="flex-row justify-between items-center ">
              <View className="flex-row items-center">
                <MaterialIcons name="notifications" size={24} color="white" className="bg-black p-1 rounded-lg" />
                <Text className="text-white ml-4">Notifikasi</Text>
              </View>
              <Switch
                trackColor={{ false: "#000000", true: "#00822F" }}
                thumbColor={isNotificationEnabled ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                value={isNotificationEnabled}
                onValueChange={setNotificationEnabled}
              />
            </View>
            <View className="border-b border-white" />
          </View>

          {/* Opsi Sidik Jari */}
          <View>
            <View className="flex-row justify-between items-center py-2">
              <View className="flex-row items-center">
                <MaterialIcons name="fingerprint" size={24} color="white" className="bg-black p-1 rounded-lg" />
                <Text className="text-white ml-4">Sidik Jari Biometri</Text>
              </View>
              <Switch
                trackColor={{ false: "#000000", true: "#00822F" }}
                thumbColor={isBiometricEnabled ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                value={isBiometricEnabled}
                onValueChange={setBiometricEnabled}
              />
            </View>
            <View className="border-b border-white" />
          </View>

          {/* Opsi Keluar */}
          <TouchableOpacity className="flex-row justify-between items-center py-4">
            <View className="flex-row items-center">
              <MaterialIcons name="logout" size={24} color="white" className="bg-black p-1 rounded-lg" />
              <Text className="text-white ml-4">Keluar</Text>
            </View>
          </TouchableOpacity>
          <View className="border-b border-white" />
        </View>
      </View>
      <Button className="bg-green-500 font-semibold" onPress={handleNavigation}>
        Go To Home Dawg
      </Button>
    </View>
  );
}
