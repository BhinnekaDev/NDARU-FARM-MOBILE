import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { textProductStatsProps } from "@/interfaces/textProductStatsProps";

const MyTextProductStats: React.FC<textProductStatsProps> = ({
  rating,
  reviews,
  sales,
  paddingTop = 10,
  paddingBottom = 10,
  iconSize = 22,
  ratingFontSize = 16,
  reviewsFontSize = 16,
  salesFontSize = 16,
}) => {
  const theme = useColorScheme();

  const textColor = theme === "dark" ? "white" : "black";

  return (
    <View
      className="flex-row items-center gap-2"
      style={{ paddingTop, paddingBottom }}
    >
      {/* Rating */}
      <View className="flex-row items-center">
        <Ionicons name="star" size={iconSize} color={textColor} />
        <Text
          style={{
            fontFamily: "LexBold",
            color: textColor,
            fontSize: ratingFontSize,
          }}
        >
          {" "}
          {rating}
        </Text>
      </View>

      {/* gap */}
      <Text
        style={{
          fontFamily: "LexBold",
          color: textColor,
          fontSize: reviewsFontSize,
        }}
      >
        |
      </Text>

      {/* Penilaian */}
      <Text
        style={{
          fontFamily: "LexBold",
          color: textColor,
          fontSize: reviewsFontSize,
        }}
      >
        {reviews} Penilaian
      </Text>

      {/* gap */}
      <Text
        style={{
          fontFamily: "LexBold",
          color: textColor,
          fontSize: reviewsFontSize,
        }}
      >
        |
      </Text>

      {/* Penjualan */}
      <Text
        style={{
          fontFamily: "LexBold",
          color: textColor,
          fontSize: salesFontSize,
        }}
      >
        {sales} Penjualan
      </Text>
    </View>
  );
};

export default MyTextProductStats;
