import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import Button from "@/components/ButtonCustomProfile";
import EditProfiles from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import ButtonSwitchProfile from "@/components/ButtonSwitchProfile";
import HeaderBackButton from "@/components/HeaderBackButton";
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
      <HeaderBackButton title="Sunting Profil" />

      {/* USER PROFILE */}
      <View className="items-center pt-20 pb-4 relative">
        <UserProfile
          containerImageClassName="w-44 h-44 rounded-full  border-gray-500 flex items-center justify-center  overflow-hidden"
          imageClassName="w-full h-full"
          nameClassName={isDarkMode ? "text-white  text-xl  mt-4" : "text-black  text-xl  mt-4"}
          emailClassName={isDarkMode ? "text-white  text-lg underline" : "text-black  text-lg underline"}
        />
        <Button
          classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} absolute bottom-24 right-40  px-2 py-1 rounded-bl-lg rounded-br-lg rounded-tl-none rounded-tr-lg`} //
          onPress={() => console.log("Edit Foto Profil")}
        >
          <Ionicons name="pencil" size={24} color="white" />
        </Button>
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
                text="Alamat Pengguna..." //
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
              <ButtonSwitchProfile
                label="Pemberitahuan" //
                textStyle={{ fontFamily: "LexSemiBold" }}
                containerClassName="py-2"
                value={isAnnouncementEnabled}
                onToggle={setAnnouncementEnabled}
                backgroundButtonOn={isDarkMode ? "#00822F" : "#00822F"}
                backgroundCircleButtonOff={isDarkMode ? "" : "#000000"}
              />
              <ButtonSwitchProfile
                label="Email" //
                textStyle={{ fontFamily: "LexSemiBold" }}
                containerClassName="py-2"
                value={isEmailEnabled}
                onToggle={setEmailEnabled}
                backgroundButtonOn={isDarkMode ? "#00822F" : "#00822F"}
                backgroundCircleButtonOff={isDarkMode ? "" : "#000000"}
              />
            </View>
          </AnimationFadeInFadeOut>
        )}
      </View>
      {/* KELUAR SUNTING PROFILE */}
      <View className="w-full px-6 mb-4">
        <EditProfiles
          labelClassName={`${isDarkMode ? "text-[#9E0505]" : "text-[#9E0505]"}  text-lg`} //
          label="Keluar"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color={isDarkMode ? "#FFFFFF" : "#000000"} />}
          isWrapperButton={true}
        />
      </View>
    </View>
  );
};

export default EditProfile;
