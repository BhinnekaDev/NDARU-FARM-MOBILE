import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

// OUR ICON
import { Ionicons } from "@expo/vector-icons";

// OUR COMPONENT
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";

export default function editFullNameScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");

  return (
    <View className="flex-1 bg-black ">
      {/* Header Button Kembali */}
      <HeaderBackButton
        icon={<Ionicons name="arrow-undo" size={43} color="white" />} //
        onPress={() => router.push("/screens/editProfile")}
        title="Sunting Nama Lengkap"
      />
      {/* Judul Form*/}
      <View className="flex justify-center items-center">
        <SectionTitle title="Sunting Nama Lengkap (Pisahkan dengan Spasi untuk Nama Depan & Belakang)" visible />
      </View>

      {/*Form*/}
      <View className="flex justify-center items-center ">
        {/* Form Nama Lengkap*/}
        <FloatingLabelInput label="Nama Lengkap" value={fullName} onChangeText={setFullName} />

        {/* Button Simpan*/}
        <Button
          classNameContainer="mt-4 bg-[#333836] px-6 py-2 rounded-lg items-center w-96"
          textClassName="text-white font-semibold text-lg" //
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
