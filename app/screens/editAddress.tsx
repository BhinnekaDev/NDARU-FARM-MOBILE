import React, { useState } from "react";
import { View, KeyboardAvoidingView, ScrollView, Platform, Keyboard, TouchableWithoutFeedback, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

// OUR COMPONENTS
import HeaderBackButton from "@/components/HeaderBackButton";
import FloatingLabelInput from "@/components/EditForm";
import Button from "@/components/ButtonCustomProfile";

// OUT UTILS
import { addressFormatter } from "@/utils/validationAddressFormatter";
import { nameFormatter } from "@/utils/validationNameFormatter";
import { numberFormatter } from "@/utils/validationNumberFormatter";

export default function editAddressScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const router = useRouter();
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [regency, setRegency] = useState("");
  const [numberPostalCode, setNumberPostalCode] = useState("");
  const [numberRT, setNumberRT] = useState("");
  const [numberRW, setNumberRW] = useState("");
  const [benchmark, setBenchmark] = useState("");
  const [address, setAddress] = useState("");

  return (
    <KeyboardAvoidingView
      className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`} //
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`flex-1 ${isDarkMode ? "bg-black" : "bg-white"}`}>
          {/* Header Button Kembali */}
          <HeaderBackButton
            onPress={() => router.push("/screens/editProfile")} //
            title="Sunting Alamat"
          />
          <View className="flex-1 ">
            <ScrollView
              contentContainerStyle={{
                paddingVertical: 10,
                flexGrow: 1,
              }} //
              keyboardShouldPersistTaps="handled"
            >
              {/*Form*/}
              <View className="flex justify-center items-center py-6">
                {/* Form Nama Lengkap*/}
                <FloatingLabelInput
                  label="Provinsi" //
                  value={province}
                  onChangeText={(input) => setProvince(nameFormatter(input))}
                />

                {/* Form Kota*/}
                <FloatingLabelInput
                  label="Kota" //
                  value={city}
                  onChangeText={(input) => setCity(nameFormatter(input))}
                />

                {/* Form Kabupaten*/}
                <FloatingLabelInput
                  label="Kabupaten" //
                  value={regency}
                  onChangeText={(input) => setRegency(nameFormatter(input))}
                />

                {/* Form Postal Code*/}
                <FloatingLabelInput
                  label="Postal Code" //
                  value={numberPostalCode}
                  onChangeText={(input) => setNumberPostalCode(numberFormatter(input, 6))}
                />

                {/* Form RT*/}
                <FloatingLabelInput
                  label="RT" //
                  value={numberRT}
                  onChangeText={(input) => setNumberRT(numberFormatter(input, 3))}
                />

                {/* Form RW*/}
                <FloatingLabelInput
                  label="RW" //
                  value={numberRW}
                  onChangeText={(input) => setNumberRW(numberFormatter(input, 3))}
                />

                {/* Form Patokan*/}
                <FloatingLabelInput
                  label="Patokan (Opsional)" //
                  value={benchmark}
                  onChangeText={(input) => setBenchmark(addressFormatter(input))}
                />

                {/* Form Alamat Lengkap*/}
                <FloatingLabelInput
                  label="Alamat Lengkap" //
                  value={address}
                  onChangeText={(input) => setAddress(addressFormatter(input))}
                />

                {/* Button Simpan*/}
                <Button
                  classNameContainer={`${isDarkMode ? "bg-[#333836]" : "bg-[#159778]"} mt-4  px-6 py-2 rounded-lg items-center w-96`}
                  textClassName="text-white font-semibold text-lg" //
                >
                  Simpan
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
