import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useRouter } from "expo-router";

// OUR ICON
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

// OUR COMPONENT
import Button from "@/components/ButtonCustomProfile";
import EditProfiles from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import SettingSwitchOptions from "@/components/ButtonSwitchProfile";

const ProfilScreen = () => (
  // Sunting Profil
  <View className="w-full px-6 mt-10">
    {/* UID */}
    <EditProfiles
      label="UID" //
      text="19YRCBHBDA"
      iconComponent={<Ionicons name="clipboard-outline" size={24} color="white" />}
      onPress={() => console.log("Ditekan!")}
      isWrapperButton={false} //
    />

    {/* Nama Lengkap */}
    <EditProfiles
      label="Nama Lengkap"
      text="Nama Lengkap"
      iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
      isWrapperButton={true} //
      onPress={() => console.log("Edit Nama Lengkap")}
    />

    {/* Nama Pengguna */}
    <EditProfiles
      label="Nama Pengguna"
      text="Nama Pengguna"
      iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
      isWrapperButton={true} //
      onPress={() => console.log("Edit Nama Pengguna")}
    />

    {/* Alamat Pengguna */}
    <EditProfiles
      label="Alamat"
      text="Alamat Pengguna..."
      iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
      isWrapperButton={true} //
    />
  </View>
);

const KeamananScreen = () => (
  // Sunting Keamanan
  <View className="w-full px-6 mt-10">
    {/* UID */}
    <EditProfiles
      label="Kode PIN" //
      text="555555"
      iconComponent={<Ionicons name="clipboard-outline" size={24} color="white" />}
      onPress={() => console.log("Ditekan!")}
      isWrapperButton={false} //
    />

    {/* Nama Lengkap */}
    <EditProfiles
      label="Nomor Telepon"
      text="+62 823 1843 1843"
      iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
      isWrapperButton={true} //
      onPress={() => console.log("Edit Nama Lengkap")}
    />

    {/* Nama Pengguna */}
    <EditProfiles
      label="Tutup Akun"
      iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
      isWrapperButton={true} //
      onPress={() => console.log("Edit Nama Pengguna")}
    />
  </View>
);

const NotifikasiScreen = () => (
  <View className="w-full px-6 mt-16 ">
    <Text className="text-white text-lg font-bold mb-2">Pilihan Pengaturan</Text>
    <View className="bg-[#333836] p-4  rounded-lg -pt-safe-offset-14 ">
      {/* Opsi Notifikasi */}
      <SettingSwitchOptions
        iconName="notifications" //
        label="Notifikasi"
        containerClassName="py-2"
        labelClassName="text-white ml-4"
        iconClassName="bg-black p-1 rounded-lg "
        dividerClassName="border-b border-white"
      />

      {/* Opsi Sidik Jari */}
      <SettingSwitchOptions
        iconName="fingerprint" //
        label="Sidik Jari Biometri"
        containerClassName="py-2"
        labelClassName="text-white ml-4"
        iconClassName="bg-black p-1 rounded-lg "
        dividerClassName="border-b border-white"
      />
    </View>
  </View>
);

// Mapping scene untuk tab
const renderScene = SceneMap({
  profil: ProfilScreen,
  keamanan: KeamananScreen,
  notifikasi: NotifikasiScreen,
});

export default function EditProfileScreen() {
  const router = useRouter();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "profil", title: "Profil" },
    { key: "keamanan", title: "Keamanan" },
    { key: "notifikasi", title: "Notifikasi" },
  ]);

  return (
    <View className="flex-1 bg-black">
      {/* Edit Profile Button */}
      <View className="flex-row items-center mt-8 ml-4">
        <Button classNameContainer=" px-3 py-2 rounded-lg" textClassName="text-white font-semibold" onPress={() => router.push("/(tabs)/profile")}>
          <Ionicons name="arrow-undo" size={43} color="white" className=" bg-transparent" />
        </Button>
        <Text className="text-white font-bold ml-2 text-lg">Sunting Profil</Text>
      </View>

      {/* Wrapper agar UserProfile tetap di tengah */}
      <View className="items-center pt-20 pb-4 ">
        <UserProfile
          containerImageClassName="w-36 h-36 rounded-full border-4 border-gray-500 flex items-center justify-center overflow-hidden"
          ImageClassName="w-full h-full"
          imageUrl="https://i.pravatar.cc/180"
          nameClassName="text-white text-xl font-bold mt-4"
          emailClassName="text-gray-400 text-lg underline"
          name="Adrian Musa Alfauzan"
          email="emailPengguna@gmail.com"
        />
      </View>

      {/* TabView agar tidak mendesak UserProfile */}
      <View className="flex-1">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              style={{
                backgroundColor: "black",
                borderBottomWidth: 1,
                borderBottomColor: "#333836",
              }}
              indicatorStyle={{ backgroundColor: "white", height: 1 }}
              activeColor="white"
              inactiveColor="gray"
            />
          )}
        />
      </View>

      {/* Keluar Sunting Profil */}
      <View className="w-full px-6 mt-10">
        <EditProfiles
          labelClassName="text-[#9E0505] font-semibold text-lg"
          label="Keluar"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
          isWrapperButton={true} //
        />
      </View>
    </View>
  );
}
