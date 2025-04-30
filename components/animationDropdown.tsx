import React, { useState } from "react";
import { View, Modal, TouchableOpacity, FlatList, Pressable, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Importing types from the separate file
import { AnimationDropdownFormProps } from "@/interfaces/animationDropdownProps"; // sesuaikan dengan path file Anda

// OUR COMPONENT
import MyText from "@/components/text";

const AnimationDropdownForm = ({
  selected, //
  onSelect,
  options = [],
  label,
  customIcon,
}: AnimationDropdownFormProps) => {
  const isDarkMode = useColorScheme() === "dark";
  const [visible, setVisible] = useState(false);

  return (
    <View className="py-4 w-96">
      {/* Dropdown terlihat seperti input */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? "#FFFFFF" : "#000000",
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <MyText textstyle={`${isDarkMode ? "text-white" : "text-black"} text-[20px]`} fontFamily="LexSemiBold">
          {label || (selected ? selected.label : "COD")}
        </MyText>

        {customIcon ? customIcon : <Ionicons name="chevron-down" size={20} color={isDarkMode ? "#fff" : "#000"} />}
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal visible={visible} transparent animationType="fade">
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: isDarkMode ? "#222" : "#fff",
              borderRadius: 10,
              padding: 12,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                  }}
                  style={{
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: isDarkMode ? "#444" : "#ccc",
                  }}
                >
                  <MyText fontFamily="LexSemiBold">{item.label}</MyText>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default AnimationDropdownForm;
