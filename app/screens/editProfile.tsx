import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import EditProfiles from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import SettingSwitchOptions from "@/components/ButtonSwitchProfile";
import HeaderWithBackButton from "@/components/HeaderBackButton";
import AccountCloseAlert from "@/components/AccountCloseAlert";
import TabBar from "@/components/TabBar";

// OUR UTILS
import AnimationUpAndDown from "@/utils/animationUpAndDown";
import AnimationFadeInFadeOut from "@/utils/animationFadeInFadeOut";

const EditProfile = () => {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";

  const [activeTab, setActiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAnnouncementEnabled, setAnnouncementEnabled] = useState(false);
  const [isEmailEnabled, setEmailEnabled] = useState(false);

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* HEADER */}
      <HeaderWithBackButton
        icon={<Ionicons name="arrow-undo" size={43} color={isDarkMode ? "white" : "black"} />} //
        onPress={() => router.push("/(tabs)/profile")}
        title="Sunting Profil"
      />

      {/* USER PROFILE */}
      <View className="items-center pt-20 pb-4 relative">
        <UserProfile
          containerImageClassName="w-36 h-36 rounded-full  border-gray-500 flex items-center justify-center mt-10 overflow-hidden"
          ImageClassName="w-full h-full"
          imageUrl="https://i.pravatar.cc/180" //
          name="Adrian Musa Alfauzan"
          nameClassName={isDarkMode ? "text-white font-extrabold text-xl  mt-4" : "text-black font-extrabold text-xl  mt-4"}
          email="emailPengguna@gmail.com"
          emailClassName={isDarkMode ? "text-white font-semibold text-lg underline" : "text-black font-semibold text-lg underline"}
        />
      </View>

      {/* TAB BAR */}
      <TabBar
        activeTab={activeTab} //
        setActiveTab={setActiveTab}
        tabs={["Profil", "Keamanan", "Notifikasi"]}
      />

      {/* TAB KONTEN */}
      <View className="flex-1 mt-4 px-4">
        {activeTab === 0 && (
          // PROFIL
          <View className="py-2 space-y-3">
            <AnimationFadeInFadeOut isActive={activeTab === 0} direction="in">
              <EditProfiles
                label="UID" //
                text="************"
                isWrapperButton={false}
                iconComponent={<Ionicons name="clipboard-outline" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => console.log("Ditekan!")}
              />
            </AnimationFadeInFadeOut>
            <AnimationUpAndDown isActive={activeTab === 0} direction="up">
              <EditProfiles
                label="Nama Lengkap" //
                text="Nama Lengkap"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => router.push("/screens/editFullName")}
              />
              <EditProfiles
                label="Nama Pengguna" //
                text="Nama Pengguna"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => router.push("/screens/editUsername")}
              />
              <EditProfiles
                label="Alamat" //
                text="Alamat Pengguna..."
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => router.push("/screens/editAddress")}
              />
            </AnimationUpAndDown>
          </View>
        )}
        {activeTab === 1 && (
          // KEAMANAN
          <AnimationUpAndDown isActive={activeTab === 1} direction="down">
            <View className="py-2 space-y-3">
              <EditProfiles
                label="Kode PIN" //
                text="******"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => router.push("/screens/editPinCode")}
              />
              <EditProfiles
                label="Nomor Telepon" //
                text="***********"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => router.push("/screens/editPhoneNumber")}
              />
              <EditProfiles
                label="Tutup Akun" //
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={`${isDarkMode ? "white" : "black"}`} />}
                onPress={() => setModalVisible(true)}
              />
              {/* MODAL TUTUP AKUN */}
              <AccountCloseAlert
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={() => {
                  console.log("Akun Ditutup");
                  setModalVisible(false);
                }}
              />
            </View>
          </AnimationUpAndDown>
        )}
        {activeTab === 2 && (
          // NOTIFIKASI
          <AnimationFadeInFadeOut isActive={activeTab === 2} direction="in">
            <View className="py-2 space-y-3">
              <SettingSwitchOptions
                label="Pemberitahuan" //
                containerClassName="py-2"
                value={isAnnouncementEnabled}
                onToggle={setAnnouncementEnabled}
              />
              <SettingSwitchOptions
                label="Email" //
                containerClassName="py-2"
                value={isEmailEnabled}
                onToggle={setEmailEnabled}
              />
            </View>
          </AnimationFadeInFadeOut>
        )}
      </View>
      {/* KELUAR SUNTING PROFILE */}
      <View className="w-full px-6 mb-4">
        <EditProfiles
          labelClassName={`${isDarkMode ? "text-[#9E0505]" : "text-[#9E0505]"} font-semibold text-lg`} //
          label="Keluar"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />}
          isWrapperButton={true}
        />
      </View>
    </View>
  );
};

export default EditProfile;
