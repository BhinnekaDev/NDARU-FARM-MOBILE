import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Animated, useColorScheme } from "react-native";

// COMPONENTS
import MyText from "@/components/text";
import MyCartDetails from "@/components/cartDetails";
import OrderTabBar from "@/components/orderTabBar";

// HOOKS
import useCart from "@/hooks/Frontend/cartDetailsScreen/useCart";

function orderTrackingTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const isDarkMode = useColorScheme() === "dark";
  const { cartItems, cartCount, handleDeleteFromCart } = useCart();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log("Cart items in CartDetailsScreen:", cartItems);
    console.log("Cart count in CartDetailsScreen:", cartCount);
  }, [cartItems, cartCount]);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#131514" : "white" }}>
      {/* JUDUL PESANAN */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 80,
          marginBottom: 10,
        }}
      >
        {/* JUDUL PESANAN - PERTAMA*/}
        <MyText fontFamily="LexBold" fontSize={20} textstyle="uppercase">
          Pesanan
        </MyText>
      </View>

      {/* TAB BAR - sekarang di bawah PESANAN */}
      <View style={{ marginBottom: 10 }}>
        <Animated.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
          <OrderTabBar
            activeTab={activeTab} //
            setActiveTab={setActiveTab}
            tabs={["Menunggu Pembayaran", "Dikemas", "Diproses", "Penilaian", "Selesai"]}
          />
        </Animated.ScrollView>
      </View>
      {/* ISI KERANJANG */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 60, paddingHorizontal: 20 }}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: false,
        })}
      >
        {/* CONTENT TAB */}
        {activeTab === 0 && (
          <View className="w-full gap-6">
            {cartItems.map((item) => (
              <MyCartDetails
                cartClassName="flex-1 px-6 "
                key={item.id} // wajib ada key prop
                id={item.id}
                image={item.image}
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
                quantity={item.quantity}
                date={item.date}
                detailType={item.detailType}
                showQuantityControl={false}
              />
            ))}
          </View>
        )}
        {activeTab === 1 && (
          <View>
            {/* Tab Dikemas */}
            <MyText fontFamily="LexBold" fontSize={18} color="white">
              Dikemas
            </MyText>
            {/* Konten untuk tab Dikemas */}
          </View>
        )}
        {activeTab === 2 && (
          <View>
            {/* Tab Diproses */}
            <MyText fontFamily="LexBold" fontSize={18} color="white">
              Diproses
            </MyText>
            {/* Konten untuk tab Diproses */}
          </View>
        )}
        {activeTab === 3 && (
          <View>
            {/* Tab Penilaian */}
            <MyText fontFamily="LexBold" fontSize={18} color="white">
              Penilaian
            </MyText>
            {/* Konten untuk tab Penilaian */}
          </View>
        )}
        {activeTab === 4 && (
          <View>
            {/* Tab Selesai */}
            <MyText fontFamily="LexBold" fontSize={18} color="white">
              Selesai
            </MyText>
            {/* Konten untuk tab Selesai */}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
}

export default orderTrackingTabs;
