import React, { useState, useRef, useEffect, Fragment } from "react";
import { View, Text, useWindowDimensions, Animated, Easing } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { useRouter } from "expo-router";

// OUR ICON
import { MaterialIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

// OUR COMPONENT
import Button from "@/components/ButtonCustomProfile";
import EditProfiles from "@/components/EditProfile";
import UserProfile from "@/components/UserProfile";
import SettingSwitchOptions from "@/components/ButtonSwitchProfile";

// OUR PROPS
import { AnimationProps } from "@/interfaces/AnimationProps";
import { RenderSceneProps } from "@/interfaces/RenderSceneProps";

// Animasi dari bawah ke atas
const AnimatedTab = ({ children, isActive }: AnimationProps) => {
  const translateY = useRef(new Animated.Value(isActive ? 0 : 50)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isActive ? 0 : 50,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return <Animated.View style={{ transform: [{ translateY }], opacity }}>{children}</Animated.View>;
};

// Animasi dari atas ke bawah
const AnimatedTab2 = ({ children, isActive }: AnimationProps) => {
  const translateY = useRef(new Animated.Value(isActive ? 0 : -50)).current;
  const opacity = useRef(new Animated.Value(isActive ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isActive ? 0 : -50,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    Animated.timing(opacity, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isActive]);

  return <Animated.View style={{ transform: [{ translateY }], opacity }}>{children}</Animated.View>;
};

const ProfilScreen = ({ isActive }: AnimationProps) => {
  const router = useRouter();
  return (
    <View className="w-full px-6 ">
      <EditProfiles label="UID" text="19YRCBHBDA" iconComponent={<Ionicons name="clipboard-outline" size={24} color="white" />} onPress={() => console.log("Ditekan!")} isWrapperButton={false} />
      <AnimatedTab isActive={isActive}>
        <Fragment>
          <EditProfiles
            label="Nama Lengkap" //
            text="Nama Lengkap"
            iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
            isWrapperButton
            onPress={() => router.push("/screens/editFullName")}
          />
          <EditProfiles
            label="Nama Pengguna" //
            text="Nama Pengguna"
            iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
            isWrapperButton
            onPress={() => console.log("Edit Nama Pengguna")}
          />
          <EditProfiles
            label="Alamat" //
            text="Alamat Pengguna..."
            iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
            isWrapperButton
          />
        </Fragment>
      </AnimatedTab>
    </View>
  );
};

const KeamananScreen = ({ isActive }: AnimationProps) => (
  <View className="w-full px-6 ">
    <AnimatedTab2 isActive={isActive}>
      <Fragment>
        <EditProfiles
          label="Kode PIN" //
          text="555555"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
          isWrapperButton={false}
        />
        <EditProfiles
          label="Nomor Telepon" //
          text="+62 823 1843 1843"
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
          isWrapperButton
          onPress={() => console.log("Edit Nomor Telepon")}
        />
        <EditProfiles
          label="Tutup Akun" //
          iconComponent={<MaterialIcons name="keyboard-arrow-right" size={24} color="white" />}
          isWrapperButton
          onPress={() => console.log("Tutup Akun")}
        />
      </Fragment>
    </AnimatedTab2>
  </View>
);

const NotifikasiScreen = ({ isActive }: AnimationProps) => (
  <AnimatedTab isActive={isActive}>
    <Fragment>
      <SettingSwitchOptions
        label="Pemberitahuan" //
        containerClassName="py-2"
        labelClassName="text-white font-semibold text-lg ml-4"
        iconClassName="bg-black p-1 rounded-lg "
        trackColorFalse="#333836"
      />
      <SettingSwitchOptions
        label="Email" //
        containerClassName="py-2"
        labelClassName="text-white font-semibold text-lg ml-4"
        iconClassName="bg-black p-1 rounded-lg "
        trackColorFalse="#333836"
      />
    </Fragment>
  </AnimatedTab>
);

export default function EditProfileScreen() {
  const router = useRouter();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "profil", title: "Profil" },
    { key: "keamanan", title: "Keamanan" },
    { key: "notifikasi", title: "Notifikasi" },
  ]);

  const renderScene = ({ route }: RenderSceneProps) => {
    switch (route.key) {
      case "profil":
        return <ProfilScreen isActive={index === 0} />;
      case "keamanan":
        return <KeamananScreen isActive={index === 1} />;
      case "notifikasi":
        return <NotifikasiScreen isActive={index === 2} />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-black">
      <View className="flex-row items-center mt-8 ml-4">
        <Button
          classNameContainer="px-3 py-2 rounded-lg" //
          textClassName="text-white font-semibold"
          onPress={() => router.push("/(tabs)/profile")}
        >
          <Ionicons name="arrow-undo" size={43} color="white" />
        </Button>
        <Text className="text-white font-bold ml-2 text-lg">Sunting Profil</Text>
      </View>
      <View className="items-center pt-20 pb-4 relative">
        <UserProfile
          containerImageClassName="w-36 h-36 rounded-full  border-gray-500 flex items-center justify-center mt-10 overflow-hidden"
          ImageClassName="w-full h-full"
          imageUrl="https://i.pravatar.cc/180" //
          name="Adrian Musa Alfauzan"
          nameClassName="text-white text-xl font-bold mt-4"
          email="emailPengguna@gmail.com"
          emailClassName="text-gray-400 text-lg underline"
        />
        <Button classNameContainer="absolute bottom-24 right-40 bg-[#333836] px-2 py-1 rounded-bl-lg rounded-br-lg rounded-tl-none rounded-tr-lg" onPress={() => console.log("Edit Foto Profil")}>
          <Ionicons name="pencil" size={24} color="white" />
        </Button>
      </View>
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
                backgroundColor: "black", //
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
    </View>
  );
}
