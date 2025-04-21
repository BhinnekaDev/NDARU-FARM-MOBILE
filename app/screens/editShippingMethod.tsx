import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useColorScheme, View } from "react-native";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";

// OUR UTILS
import { nameFormatter } from "@/utils/validationNameFormatter";

export default function editShippingMethod() {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const [fullName, setFullName] = useState("");

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Header Button Kembali */}
      <HeaderBackButton
        onPress={() => router.push("/screens/editProfile")} //
        title="Sunting Nama Lengkap"
      />

      {/* Judul Form*/}
      <View className="flex justify-center items-center">
        <SectionTitle title="Sunting Nama Lengkap (Pisahkan dengan Spasi untuk Nama Depan & Belakang)" />
      </View>

      {/*Form*/}
      <View className="flex justify-center items-center ">
        {/* Form Nama Lengkap*/}
        <FloatingLabelInput
          label="Nama Lengkap" //
          value={fullName}
          onChangeText={(input) => setFullName(nameFormatter(input))}
        />

        {/* Button Simpan*/}
        <Button
          classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-4  px-6 py-2 rounded-lg items-center w-96`}
          textClassName="text-white  text-lg" //
          textStyle={{ fontFamily: "LexBold" }}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
