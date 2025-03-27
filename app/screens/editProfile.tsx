import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Dimensions, Easing } from "react-native";
import { useRouter } from "expo-router";

// OUR ICONS
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENTS
import ButtonBar from "@/components/ButtonCustomProfile";
import EditProfiles from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import SettingSwitchOptions from "@/components/ButtonSwitchProfile";
import HeaderWithBackButton from "@/components/HeaderBackButton";
import AccountCloseAlert from "@/components/AccountCloseAlert";

// OUR UTILS
import AnimationUpAndDown from "@/utils/animationUpAndDown";
import AnimationFadeInFadeOut from "@/utils/animationFadeInFadeOut";
import AnimationBar from "@/utils/animationBar";

const EditProfile = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  // Daftar tab (bisa ditambah)
  const tabs = ["Profil", "Keamanan", "Notifikasi"];
  const { width } = Dimensions.get("window");
  const tabWidth = width / tabs.length;

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    Animated.timing(translateX, {
      toValue: index * tabWidth,
      duration: 300,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 bg-black">
      {/* HEADER */}
      <HeaderWithBackButton
        icon={<Ionicons name="arrow-undo" size={43} color="white" />} //
        onPress={() => router.push("/(tabs)/profile")}
        title="Sunting Profil"
      />

      {/* USER PROFILE */}
      <View className="items-center pt-20 pb-4 relative">
        <UserProfile
          containerImageClassName="w-36 h-36 rounded-full border-gray-500 flex items-center justify-center mt-1 overflow-hidden"
          ImageClassName="w-full h-full"
          imageUrl="https://i.pravatar.cc/180"
          name="Adrian Musa Alfauzan"
          nameClassName="text-white text-xl font-bold mt-4"
          email="emailPengguna@gmail.com"
          emailClassName="text-gray-400 text-lg underline"
        />
      </View>

      {/* TAB BAR */}
      <View className="relative w-full h-12 border-b-2 flex-row">
        <AnimationBar translateX={translateX} tabWidth={tabWidth} />
        {tabs.map((title, index) => (
          <ButtonBar
            key={index} //
            classNameContainer="flex-1 justify-center items-center"
            textClassName={activeTab === index ? "text-white font-bold text-lg" : "text-gray-400 text-lg"}
            onPress={() => handleTabPress(index)}
          >
            {title}
          </ButtonBar>
        ))}
      </View>

      {/* TAB KONTEN */}
      <View className="flex-1 mt-4 px-4">
        {activeTab === 0 && (
          // PROFIL
          <View className="py-2 space-y-3">
            <AnimationFadeInFadeOut isActive={activeTab === 0} direction="in">
              <EditProfiles
                label="UID" //
                text="19YRCBHBDA"
                isWrapperButton={false}
                iconComponent={<Ionicons name="clipboard-outline" size={24} color="white" />}
                onPress={() => console.log("Ditekan!")}
              />
            </AnimationFadeInFadeOut>
            <AnimationUpAndDown isActive={activeTab === 0} direction="up">
              <EditProfiles
                label="Nama Lengkap" //
                text="Nama Lengkap"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
                onPress={() => router.push("/screens/editFullName")}
              />
              <EditProfiles
                label="Nama Pengguna" //
                text="Nama Pengguna"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
                onPress={() => router.push("/screens/editUsername")}
              />
              <EditProfiles
                label="Alamat" //
                text="Alamat Pengguna..."
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
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
                text="555555"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
                onPress={() => router.push("/screens/editPinCode")}
              />
              <EditProfiles
                label="Nomor Telepon" //
                text="+62 823 1843 1843"
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
                onPress={() => router.push("/screens/editPhoneNumber")}
              />
              <EditProfiles
                label="Tutup Akun" //
                isWrapperButton={true}
                iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
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
                labelClassName="text-white font-semibold text-lg "
                iconClassName="bg-black  rounded-lg "
                trackColorFalse="#333836"
              />
              <SettingSwitchOptions
                label="Email" //
                containerClassName="py-2"
                labelClassName="text-white font-semibold text-lg "
                iconClassName="bg-black  rounded-lg "
                trackColorFalse="#333836"
              />
            </View>
          </AnimationFadeInFadeOut>
        )}
      </View>
      {/* KELUAR SUNTING PROFILE */}
      <View className="w-full px-6 mt-10">
        <EditProfiles
          labelClassName="text-[#9E0505] font-semibold text-lg" //
          label="Keluar"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
          isWrapperButton={true}
        />
      </View>
    </View>
  );
};

export default EditProfile;
