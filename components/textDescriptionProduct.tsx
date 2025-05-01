import React, { useState } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";

const MyTextDescription: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const fullText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.";

  const [showFullText, setShowFullText] = useState(false);
  const previewText = fullText.slice(0, 135) + "...";

  return (
    <View>
      <Text
        className={`text-base font-semibold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
        style={{ fontFamily: "LexSemiBold" }}
      >
        {showFullText ? fullText : previewText}
      </Text>

      <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
        <Text
          style={{
            fontFamily: "LexSemiBold",
            color: isDarkMode ? "#0FC348" : "#159778",
          }}
        >
          {showFullText ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyTextDescription;
