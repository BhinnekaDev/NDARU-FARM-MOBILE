import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme, View } from "react-native";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import Button from "@/components/ButtonCustomProfile";
import SectionTitle from "@/components/EditFormTitle";
import CustomDropdown from "@/components/animationDropdown";

// OUR HOOKS
import { useEditSalesMethod } from "@/hooks/Frontend/editSalesMethod/useEditSalesMethod"; // Import custom hook

export default function editSalesMethod() {
  const isDarkMode = useColorScheme() === "dark";
  const {
    selectedMethod, //
    setSelectedMethod,
    salesOptions,
    handleSave,
  } = useEditSalesMethod();

  return (
    <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
      {/* HEADER BUTTON KEMBALI */}
      <HeaderBackButton title="Pilih Metode Pembayaran" />

      {/* JUDUL FORM */}
      <View className="flex justify-center items-center">
        <SectionTitle title="Pilih salah satu metode pembayaran dengan mengklik tombol agar bisa melanjutkan ke tahap berikutnya." />
      </View>

      {/* FORM */}
      <View className="flex justify-center items-center">
        {/* DROPDOWN PILIH METODE PEMBAYARAN */}
        <CustomDropdown
          selected={selectedMethod} //
          onSelect={setSelectedMethod}
          options={salesOptions}
        />

        {/* BUTTON SIMPAN */}
        <Button
          onPress={handleSave} //
          classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-4  px-6 py-2 rounded-lg items-center w-96`}
          textClassName="text-white text-lg"
          textStyle={{ fontFamily: "LexBold" }}
        >
          Simpan
        </Button>
      </View>
    </View>
  );
}
