import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AccountCloseAlert = ({ visible, onClose, onConfirm }) => {
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
      <View className="bg-[#333836] w-full rounded-t-2xl">
        {/* Header dengan garis bawah */}
        <View className="flex-row items-center justify-between px-4 py-3 border-b-[0.5px] border-white">
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-base uppercase flex-1 text-center font-extrabold">Tutup Akun</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Pesan konfirmasi */}
        <View className="p-6">
          <Text className="text-gray-300 text-left font-extrabold">
            Tunggu Dulu! Apakah Anda Benar Benar Akan Pergi? Sebelum Menghapus Akun Anda, Pastikan Untuk Menutup Atau Melikuidasi Posisi Anda, Menarik Saldo Anda, dan Mengosongkan dompet ndaru pay Anda, Karena Akun Tidak Dapat Dipulihkan
            Setelah Akun Dihapus
          </Text>

          {/* Tombol Aksi */}
          <View className="mt-6">
            <TouchableOpacity className="bg-[#EB1A1D] py-3 rounded-lg" onPress={onConfirm}>
              <Text className="text-white font-bold text-center text-2xl">Hapus Akun</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AccountCloseAlert;
