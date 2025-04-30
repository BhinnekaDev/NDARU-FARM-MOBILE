import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useColorScheme, View } from "react-native";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";
import CustomDropdown from "@/components/animationDropdown";

// OUR INTERFACES
import { Option } from "@/interfaces/animationDropdownProps";

export default function editPaymentMethod() {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<Option | null>(null);

  const paymentOptions = [
    { label: "Transfer Bank", value: "bank" },
    { label: "E-Wallet (OVO, Dana, Gopay)", value: "ewallet" },
    { label: "Kartu Kredit / Debit", value: "card" },
    { label: "COD", value: "cod" },
  ];

  const handleSimpan = () => {
    if (selectedMethod) {
      console.log("Metode Pembayaran Dipilih:", selectedMethod);
      alert(`Metode pembayaran berhasil disimpan! ${selectedMethod.label}`);
    } else {
      alert("Pilih metode pembayaran dulu, bro!");
    }
  };
  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* HEADER BUTTON KEMBALI */}
      <HeaderBackButton
        onPress={() => router.push("/screens/editProfile")} //
        title="Pilih Metode Pembayaran"
      />

      {/* JUDUL FORM*/}
      <View className="flex justify-center items-center">
        <SectionTitle title="Pilih salah satu metode pembayaran dengan mengklik tombol agar bisa melanjutkan ke tahap berikutnya." />
      </View>

      {/*FORM*/}
      <View className="flex justify-center items-center ">
        {/* DROPDOWN PILIH METODE PEMBAYARAN */}
        <CustomDropdown
          selected={selectedMethod} //
          onSelect={setSelectedMethod}
          options={paymentOptions}
        />

        {/* BUTTON SIMPAN*/}
        <Button
          onPress={handleSimpan}
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
