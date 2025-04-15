import React, { useEffect } from "react";
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

const CartDetailsScreen = () => {
  const { cartItems, cartCount, handleDeleteFromCart } = useCart(); // Mendapatkan data keranjang

  useEffect(() => {
    console.log("Cart items in CartDetailsScreen:", cartItems); // Verifikasi cartItems
    console.log("Cart count in CartDetailsScreen:", cartCount); // Verifikasi cartCount
  }, [cartItems, cartCount]);

  return (
    <View className="w-full gap-8 flex-1 my-20">
      <Text className="text-xl font-semibold">Keranjang Anda</Text>
      <Text className="text-lg">Total Pesanan: {cartCount} item</Text>

      {/* Menampilkan daftar produk yang sudah dipesan */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id ?? ""}
        renderItem={({ item }) => (
          <View className="border-b py-4">
            <Text className="font-bold">{item.name}</Text>
            <Text>{item.description}</Text>
            <Text className="text-green-500">Price: {item.price}</Text>
            <Text className="text-gray-500">Quantity: {item.quantity}</Text>

            {/* Tombol Hapus */}
            <TouchableOpacity onPress={() => handleDeleteFromCart(item.id ?? "There's No ID ")}>
              <Text className="text-red-500">Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default CartDetailsScreen;
