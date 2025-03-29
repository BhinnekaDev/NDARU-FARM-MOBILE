import React, { useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR ICON
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENT
import ButtonProfile from "@/components/ButtonCustomProfile";
import SettingSwitchOptions from "@/components/ButtonSwitchProfile";
import UserProfile from "@/components/UserProfile";

export default function ProfileTabs() {
  const isDarkMode = useColorScheme() === "dark";

  const [isNotificationEnabled, setNotificationEnabled] = useState(false);
  const [isBiometricEnabled, setBiometricEnabled] = useState(false);
  const router = useRouter();
  const handleEditProfile = () => {
    router.push("/screens/editProfile");
  };
  return (
    <View className={`flex-1 justify-center  items-center ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* PEMBUNGKUS USER PROFIL*/}
      <UserProfile
        containerImageClassName="w-36 h-36 rounded-full  border-gray-500 flex items-center justify-center mt-10 overflow-hidden"
        ImageClassName="w-full h-full"
        imageUrl="https://i.pravatar.cc/180" //
        name="Adrian Musa Alfauzan"
        nameClassName={isDarkMode ? "text-white font-extrabold text-xl  mt-4" : "text-black font-extrabold text-xl  mt-4"}
        email="emailPengguna@gmail.com"
        emailClassName={isDarkMode ? "text-white font-semibold text-lg underline" : "text-black font-semibold text-lg underline"}
      />
      {/* EDIT BUTTON PROFIL */}
      <ButtonProfile
        classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-8  px-6 py-2 rounded-lg`}
        textClassName="text-white font-semibold" //
        onPress={handleEditProfile}
      >
        Sunting Profile
      </ButtonProfile>

      {/* OPSI PENGATURAN SWITCH */}
      <View className="w-full px-6 mt-16 ">
        <Text className="text-black text-lg font-extrabold mb-2">Pilihan Pengaturan</Text>
        <View className={`${isDarkMode ? "bg-[#333836]" : "bg-[#093731]"} p-4 rounded-lg -pt-safe-offset-14`}>
          {/* OPSI NOTIFIKASI */}
          <SettingSwitchOptions
            iconComponent={<MaterialIcons name="notifications" size={24} color="white" className="bg-black p-1 rounded-lg " />}
            label="Notifikasi"
            value={isNotificationEnabled}
            onToggle={setNotificationEnabled}
            containerClassName="py-2"
            labelClassName="text-white ml-4"
            dividerClassName="border-b border-white"
            backgroundButtonOn={isDarkMode ? "#00822F" : "#00822F"}
            backgroundCircleButtonOff={isDarkMode ? "" : "#000000"}
          />

          {/* OPSI SIDIK JARI */}
          <SettingSwitchOptions
            iconComponent={<MaterialIcons name="fingerprint" size={24} color="white" className="bg-black p-1 rounded-lg " />}
            label="Sidik Jari Biometri"
            value={isBiometricEnabled}
            onToggle={setBiometricEnabled}
            containerClassName="py-2"
            labelClassName="text-white ml-4"
            dividerClassName="border-b border-white"
            backgroundButtonOn={`${isDarkMode ? "#00822F" : "#00822F"}`}
            backgroundCircleButtonOff={`${isDarkMode ? null : "#000000"}`}
          />

          {/* OPSI KELUAR */}
          <ButtonProfile classNameContainer="flex-row justify-between items-center py-2" onPress={() => router.push("/(tabs)/profile")}>
            <View className="flex-row items-center">
              <MaterialIcons name="logout" size={24} color="white" className="bg-black p-1 rounded-lg" />
              <Text className="text-white ml-4">Keluar</Text>
            </View>
          </ButtonProfile>
          <View className="border-b border-white " />
        </View>
      </View>
    </View>
  );
}
