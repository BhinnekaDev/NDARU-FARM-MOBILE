import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, useColorScheme } from "react-native";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";

// OUR UTILS
import { phoneNumberFormatter } from "@/utils/validationPhoneNumberFormatter";

export default function EditPhoneNumberScreen() {
  const router = useRouter();
  const isDarkMode = useColorScheme() === "dark";

  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Header Button Kembali */}
      <HeaderBackButton
        onPress={() => router.push("/screens/editProfile")} //
        title="Sunting Nomor Telepon"
      />

      {/* Judul Form */}
      <View className="flex justify-center items-center">
        <SectionTitle title="Silakan Masukkan Nomor Telepon Anda (Gunakan angka tanpa spasi atau simbol)" />
      </View>

      {/* Form */}
      <View className="flex justify-center items-center ">
        {/* Form Nomor Telepon */}
        <FloatingLabelInput
          label="Nomor Telepon" //
          value={phoneNumber}
          onChangeText={(input) => setPhoneNumber(phoneNumberFormatter(input))}
        />

        {/* Button Simpan */}
        <Button
          classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-4  px-6 py-2 rounded-lg items-center w-96`} //
          textClassName="text-white font-semibold text-lg"
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
