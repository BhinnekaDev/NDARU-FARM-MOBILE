import React, { useState, useRef } from "react";
import { View, Text, TextInput, Animated } from "react-native";
import { useRouter } from "expo-router";

// OUR ICON
import Ionicons from "@expo/vector-icons/Ionicons";
// OUR COMPONENT
import Button from "@/components/ButtonCustomProfile";
import HeaderWithBackButton from "@/components/HeaderBackButton";

export default function EditFullName() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const animatedLabel = useRef(new Animated.Value(fullName ? 1 : 0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    if (!fullName) {
      setIsFocused(false);
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View className="flex-1 bg-black">
      <HeaderWithBackButton
        icon={<Ionicons name="arrow-undo" size={43} color="white" />} //
        onPress={() => router.push("/screens/editProfile")}
        title="Sunting Nama Lengkap"
      />

      {/* Subtitle */}
      <View className="flex justify-center items-center ">
        <View>
          <View className="py-8">
            <Text className=" text-gray-400  text-lg font-semibold mb-4 w-96">Sunting Nama Pengguna (Gunakan Huruf & Angka Tanpa Spasi)</Text>
          </View>
          {/* Input Nama Lengkap */}
          <View className="border-b border-gray-600  relative">
            <Animated.Text
              style={[
                {
                  position: "absolute",
                  left: 0,
                  fontSize: animatedLabel.interpolate({
                    inputRange: [0, 1],
                    outputRange: [18, 14],
                  }),
                  top: animatedLabel.interpolate({
                    inputRange: [0, 1],
                    outputRange: [5, -15],
                  }),
                  color: isFocused ? "white" : "gray",
                },
                { fontWeight: "bold" },
              ]}
            >
              Nama Lengkap
            </Animated.Text>
            <TextInput
              className="text-white text-lg" //
              placeholder={isFocused ? "" : ""}
              placeholderTextColor="gray"
              value={fullName}
              onChangeText={setFullName}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ height: 40 }}
            />
          </View>
          {/* Button Sunting Simpan */}
          <Button
            classNameContainer="mt-8 bg-[#333836] px-6 py-2 rounded-lg items-center"
            textClassName="text-white font-semibold text-lg" //
          >
            Simpan
          </Button>
        </View>
      </View>
    </View>
  );
}
