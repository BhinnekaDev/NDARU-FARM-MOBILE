import React, { useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import ButtonProfile from "@/components/ButtonCustomProfile";
import ButtonSwitchProfile from "@/components/ButtonSwitchProfile";
import UserProfile from "@/components/UserProfile";

export default function ProfileTabs() {
    const isDarkMode = useColorScheme() === "dark";
    const router = useRouter();

    const [isNotificationEnabled, setNotificationEnabled] = useState(false);
    const [isBiometricEnabled, setBiometricEnabled] = useState(false);

    const handleEditProfile = () => {
        router.push("/screens/editProfile");
    };

    return (
        <View
            className={`flex-1 justify-center items-center ${
                isDarkMode ? "bg-black" : "bg-white"
            }`}
        >
            {/* USER PROFILE */}
            <UserProfile
                containerImageClassName="w-44 h-44 rounded-full border-gray-500 flex items-center justify-center overflow-hidden"
                imageClassName="w-full h-full"
                nameClassName={
                    isDarkMode
                        ? "text-white font-extrabold text-xl mt-4"
                        : "text-black font-extrabold text-xl mt-4"
                }
                emailClassName={
                    isDarkMode
                        ? "text-white font-semibold text-lg underline"
                        : "text-black font-semibold text-lg underline"
                }
            />

            {/* EDIT PROFILE BUTTON */}
            <ButtonProfile
                classNameContainer={`${
                    isDarkMode ? "bg-[#333836]" : "bg-[#159778]"
                } mt-8 px-6 py-2 rounded-lg`}
                textClassName="text-white font-semibold text-xl"
                onPress={handleEditProfile}
            >
                Sunting Profile
            </ButtonProfile>

            {/* SETTINGS OPTIONS */}
            <View className="w-full px-6 mt-16">
                <Text
                    className={`${
                        isDarkMode ? "text-white" : "text-black"
                    } text-xl font-extrabold mb-2`}
                >
                    Pilihan Pengaturan
                </Text>
                <View
                    className={`${
                        isDarkMode ? "bg-[#333836]" : "bg-[#093731]"
                    } px-4 pb-4 rounded-lg`}
                >
                    {/* NOTIFICATION OPTION */}
                    <ButtonSwitchProfile
                        containerClassName="py-4"
                        iconComponent={
                            <MaterialIcons
                                name="notifications"
                                size={28}
                                color="white"
                                className="bg-black p-1 rounded-lg"
                            />
                        }
                        label="Notifikasi"
                        value={isNotificationEnabled}
                        onToggle={setNotificationEnabled}
                        labelClassName="text-white font-extrabold"
                        dividerClassName="border-b border-white pb-3"
                        backgroundButtonOn="#00822F"
                        backgroundCircleButtonOff={isDarkMode ? "" : "#000000"}
                    />

                    {/* BIOMETRIC OPTION */}
                    <ButtonSwitchProfile
                        containerClassName="py-4"
                        iconComponent={
                            <MaterialIcons
                                name="fingerprint"
                                size={28}
                                color="white"
                                className="bg-black p-1 rounded-lg"
                            />
                        }
                        label="Sidik Jari Biometri"
                        value={isBiometricEnabled}
                        onToggle={setBiometricEnabled}
                        labelClassName="text-white font-extrabold"
                        dividerClassName="border-b border-white pb-3"
                        backgroundButtonOn="#00822F"
                        backgroundCircleButtonOff={isDarkMode ? "" : "#000000"}
                    />

                    {/* LOGOUT OPTION */}
                    <ButtonProfile
                        classNameContainer="flex-row justify-between items-center py-2"
                        onPress={() => router.push("/(tabs)/profile")}
                    >
                        <View className="flex-row items-center">
                            <MaterialIcons
                                name="logout"
                                size={28}
                                color="white"
                                className="bg-black p-1 rounded-lg"
                            />
                            <Text className="text-white font-extrabold text-lg ml-4">
                                Keluar
                            </Text>
                        </View>
                    </ButtonProfile>
                    <View className="border-b border-white" />
                </View>
            </View>
        </View>
    );
}
