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

// OUR UTILS
import { formatPhoneNumber } from "@/utils/phoneNumberFormatter";

export default function EditPhoneNumberScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <View className="flex-1 bg-black ">
      {/* Header Button Kembali */}
      <HeaderBackButton
        icon={<Ionicons name="arrow-undo" size={43} color="white" />} //
        onPress={() => router.push("/screens/editProfile")}
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
          onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
        />

        {/* Button Simpan */}
        <Button
          classNameContainer="mt-4 bg-[#333836] px-6 py-2 rounded-lg items-center w-96" //
          textClassName="text-white font-semibold text-lg"
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
