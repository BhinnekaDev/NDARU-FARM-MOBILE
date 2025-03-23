import React from "react";
import { View, Text, Image } from "react-native";
import Modal from "react-native-modal";

// OUR ICON
import { MaterialIcons } from "@expo/vector-icons";

// OUR COMPONENT
import ButtonProfile from "@/components/ButtonCustomProfile";

// OUR INTERFACES
import { AccountCloseAlertProps } from "@/interfaces/AccountCloseAlertProps";

const AccountCloseAlert = ({ visible, onClose, onConfirm }: AccountCloseAlertProps) => {
  return (
    <Modal
      isVisible={visible} //
      onBackdropPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.5}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-[#333836] w-full h-4/6 rounded-t-2xl">
        {/* Header dengan garis bawah */}
        <View className="flex-row items-center justify-center px-4 py-3 border-b-[0.5px] border-white">
          <Text className="text-white text-base uppercase font-extrabold">Tutup Akun</Text>
          <ButtonProfile
            classNameContainer="absolute right-4"
            textClassName="text-white font-bold text-center text-2xl" //
            onPress={onClose}
          >
            <MaterialIcons name="close" size={20} color="white" />
          </ButtonProfile>
        </View>

        {/* Gambar Peringatan */}
        <View className="items-center mt-4">
          <Image source={require("@/assets/images/ImageCloseAccount.png")} className="w-72 h-72" />
        </View>

        {/* Pesan konfirmasi */}
        <View className="p-6">
          <Text className="text-gray-300 text-left font-extrabold">
            Tunggu Dulu! Apakah Anda Benar Benar Akan Pergi? Sebelum Menghapus Akun Anda, Pastikan Untuk Menutup Atau Melikuidasi Posisi Anda, Menarik Saldo Anda, dan Mengosongkan dompet ndaru pay Anda, Karena Akun Tidak Dapat Dipulihkan
            Setelah Akun Dihapus
          </Text>

          {/* Tombol Aksi Hapus */}
          <View className="mt-6">
            <ButtonProfile
              classNameContainer="bg-[#EB1A1D] py-3 rounded-lg active:bg-black"
              textClassName="text-white font-bold text-center text-2xl" //
              onPress={onConfirm}
            >
              Hapus Akun
            </ButtonProfile>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountCloseAlert;
