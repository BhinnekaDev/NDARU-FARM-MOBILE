import React, { useState } from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useRouter } from "expo-router";

// OUR COMPONENT
import Button from "@/components/ButtonProfile";
import UserProfile from "@/components/UserProfile";

// Dummy screen untuk setiap tab
const ProfilScreen = () => (
  <View className="flex-1 justify-center items-center bg-black">
    <Text className="text-white">Profil Content</Text>
  </View>
);

const KeamananScreen = () => (
  <View className="flex-1 justify-center items-center bg-black">
    <Text className="text-white">Keamanan Content</Text>
  </View>
);

const NotifikasiScreen = () => (
  <View className="flex-1 justify-center items-center bg-black">
    <Text className="text-white">Notifikasi Content</Text>
  </View>
);

// Mapping scene untuk tab
const renderScene = SceneMap({
  profil: ProfilScreen,
  keamanan: KeamananScreen,
  notifikasi: NotifikasiScreen,
});

export default function Index() {
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
      {/* Container Foto Profil */}
      <UserProfile
        containerImageClassName="w-36 h-36 rounded-full border-4 border-gray-500 flex items-center justify-center mt-10 overflow-hidden"
        ImageClassName="w-full h-full"
        imageUrl="https://i.pravatar.cc/180"
        nameClassName="text-white text-xl font-bold mt-4"
        emailClassName="text-gray-400 text-lg underline"
        name="Adrian Musa Alfauzan"
        email="emailPengguna@gmail.com"
      />

      {/* TabView dengan swipe */}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar {...props} style={{ backgroundColor: "black", borderBottomWidth: 1, borderBottomColor: "#4A4A4A" }} indicatorStyle={{ backgroundColor: "white", height: 3 }} activeColor="white" inactiveColor="gray" />
        )}
      />

      {/* Edit Profile Button */}
      <Button classNameContainer="mt-8 bg-[#333836] px-6 py-2 rounded-lg" textClassName="text-white font-semibold" onPress={() => router.push("/(tabs)/profile")}>
        Back
      </Button>
    </View>
  );
}
