import React, { useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

// OUR ICON
import { Ionicons } from "@expo/vector-icons";

// OUR COMPONENT
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";

export default function editAddress() {
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
    <View className="flex-1 bg-black ">
      <HeaderBackButton
        icon={<Ionicons name="arrow-undo" size={43} color="white" />} //
        onPress={() => router.push("/screens/editProfile")}
        title="Sunting Nama Lengkap"
      />
      <View className="flex justify-center items-center  py-6">
        <FloatingLabelInput label="Nama Lengkap" value={fullName} onChangeText={setFullName} />
        <FloatingLabelInput label="Kota" value={city} onChangeText={setCity} />
        <FloatingLabelInput label="Kabupaten" value={regency} onChangeText={setRegency} />
        <FloatingLabelInput label="Postal Code" value={numberPostalCode} onChangeText={setNumberPostalCode} />
        <FloatingLabelInput label="RT" value={numberRT} onChangeText={setNumberRT} />
        <FloatingLabelInput label="RW" value={numberRW} onChangeText={setNumberRW} />
        <FloatingLabelInput label="Patokan (Opsional)" value={benchmark} onChangeText={setBenchmark} />
        <FloatingLabelInput label="Alamat Lengkap" value={address} onChangeText={setAddress} />
        <Button
          classNameContainer="mt-8 bg-[#333836] px-6 py-2 rounded-lg items-center w-96"
          textClassName="text-white font-semibold text-lg" //
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
