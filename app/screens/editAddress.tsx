import React, { useState } from "react";
import { View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR COMPONENT
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";

export default function editAddressScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [regency, setRegency] = useState("");
  const [numberPostalCode, setNumberPostalCode] = useState("");
  const [numberRT, setNumberRT] = useState("");
  const [numberRW, setNumberRW] = useState("");
  const [benchmark, setBenchmark] = useState("");
  const [address, setAddress] = useState("");

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* Header Button Kembali */}
      <HeaderBackButton
        onPress={() => router.push("/screens/editProfile")} //
        title="Sunting Nama Lengkap"
      />

      {/*Form*/}
      <View className="flex justify-center items-center  py-6">
        {/* Form Nama Lengkap*/}
        <FloatingLabelInput label="Nama Lengkap" value={fullName} onChangeText={setFullName} />

        {/* Form Kota*/}
        <FloatingLabelInput label="Kota" value={city} onChangeText={setCity} />

        {/* Form Kabupaten*/}
        <FloatingLabelInput label="Kabupaten" value={regency} onChangeText={setRegency} />

        {/* Form Postal Code*/}
        <FloatingLabelInput label="Postal Code" value={numberPostalCode} onChangeText={setNumberPostalCode} />

        {/* Form RT*/}
        <FloatingLabelInput label="RT" value={numberRT} onChangeText={setNumberRT} />

        {/* Form RW*/}
        <FloatingLabelInput label="RW" value={numberRW} onChangeText={setNumberRW} />

        {/* Form Patokan*/}
        <FloatingLabelInput label="Patokan (Opsional)" value={benchmark} onChangeText={setBenchmark} />

        {/* Form Alamat Lengkap*/}
        <FloatingLabelInput label="Alamat Lengkap" value={address} onChangeText={setAddress} />

        {/* Button Simpan*/}
        <Button
          classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-4  px-6 py-2 rounded-lg items-center w-96`}
          textClassName="text-white font-semibold text-lg" //
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
