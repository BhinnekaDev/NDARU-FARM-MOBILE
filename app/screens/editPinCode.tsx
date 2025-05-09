import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, useColorScheme } from "react-native";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";

// OUT UTILS
import { numberFormatter } from "@/utils/validationNumberFormatter";

export default function editPinCodeScreen() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";

  const [pinCode, setPinCode] = useState("");

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Header Button Kembali */}
      <HeaderBackButton title="Sunting Nama Pengguna" />

      {/* Judul Form*/}
      <View className="flex justify-center items-center">
        <SectionTitle title="Sunting Kode Pin (Gunakan angka tanpa spasi)" />
      </View>

      {/*Form*/}
      <View className="flex justify-center items-center ">
        {/*Form Kode Pin*/}
        <FloatingLabelInput
          label="Kode Pin" //
          value={pinCode}
          onChangeText={(input) => setPinCode(numberFormatter(input, 6))}
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
