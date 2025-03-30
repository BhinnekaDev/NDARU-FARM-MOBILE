import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { MyTextCommentProps } from "@/interfaces/textCommentProps";

const commentsData = [
  {
    id: 1,
    username: "Naufal Super Indo",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 5,
    date: "1 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
  {
    id: 2,
    username: "Sandoro WallMart",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 4,
    date: "2 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
  {
    id: 3,
    username: "Ahsan Padang 99",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 3,
    date: "3 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
  {
    id: 4,
    username: "Hengki Warteg XX",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 2,
    date: "4 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
  {
    id: 5,
    username: "Gibran Yogya",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 1,
    date: "5 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
  {
    id: 6,
    username: "Rezky Alfamidi Dimari",
    profileImage: require("@/assets/images/defaultProfile.png"),
    rating: 0,
    date: "6 hari lalu",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, molestiae deserunt suscipit, maiores ex vitae voluptate adipisci, ut odio repellendus totam quam quidem id voluptatem non eum veritatis facilis possimus.",
    images: [
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
      require("@/assets/images/detailProduct/3.png"),
    ],
  },
];

const MyTextComment: React.FC<MyTextCommentProps> = ({
  className,
  showHeaderType = true,
  showComment = commentsData.length,
}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "#FFFFFF80" : "#00000080";
  const textRatingColor = isDarkMode ? "#FFFFFF" : "#000000";
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  const displayedComments = commentsData.slice(0, showComment);

  const toggleComment = (id: number) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View className={`py-20 ${className}`}>
      {showHeaderType ? (
        <>
          {/* Ulasan Pembeli */}
          <View className="flex-row items-center justify-between">
            <Text
              style={{ fontFamily: "LexBold", color: textColor, fontSize: 16 }}
            >
              Ulasan Pembeli
            </Text>
            <TouchableOpacity
              onPress={() => router.push("/screens/commentScreen")}
              activeOpacity={0.3}
            >
              <Text
                style={{
                  fontFamily: "LexSemiBold",
                  fontSize: 16,
                  color: isDarkMode ? "#0FC348" : "#159778",
                }}
              >
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <View className="flex-row items-center space-x-2 py-2">
            <Ionicons name="star" size={20} color={textRatingColor} />
            <Text
              style={{
                fontFamily: "LexBold",
                color: textRatingColor,
                fontSize: 15,
              }}
            >
              4.0
            </Text>
            <Text
              style={{
                fontFamily: "LexSemiBold",
                color: textRatingColor,
                fontSize: 15,
              }}
            >
              14 Penilaian . 2 Ulasan
            </Text>
          </View>
        </>
      ) : null}

      {commentsData.slice(0, showComment).map((comment, index) => {
        const isExpanded = expandedComments[comment.id] || false;
        const previewText = comment.comment.slice(0, 135) + "...";
        const isLastComment = index === displayedComments.length - 1;
        const displayedImages = comment.images.slice(0, 3);
        const hasMoreImages = comment.images.length > 3;

        return (
          <View key={comment.id}>
            {/* Pengguna */}
            <View className="flex-row items-center gap-2 py-2">
              <Image
                source={comment.profileImage}
                className="w-10 h-10 rounded-full"
              />
              <View>
                <Text
                  style={{
                    fontFamily: "LexBold",
                    color: isDarkMode ? "white" : "black",
                    fontSize: 16,
                  }}
                >
                  {comment.username}
                </Text>
                <Text
                  style={{
                    fontFamily: "LexSemiBold",
                    color: isDarkMode ? "#FFFFFF70" : "#00000070",
                    fontSize: 13,
                  }}
                >
                  1 Ulasan Lengkap
                </Text>
              </View>
            </View>

            {/* Gambar Produk Ulasan */}
            <View className="flex-row gap-2 py-2">
              {displayedImages.map((img, index) => (
                <TouchableOpacity
                  key={index}
                  className="relative"
                  onPress={() => router.push("/screens/imageReviewScreen")}
                >
                  <Image source={img} className="w-32 h-32 rounded-lg" />
                  {hasMoreImages && index === 2 && (
                    <View className="flex-row items-center gap-1 absolute bottom-2 right-2 bg-black/60 bg-opacity-50 rounded-md px-2 py-1">
                      <Feather name="image" size={16} color="white" />
                      <Text
                        className="text-white"
                        style={{ fontSize: 12, fontFamily: "LexSemiBold" }}
                      >
                        +{comment.images.length - 3}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>

            {/* Jumlah Bintang */}
            <View className="flex-row items-center gap-1.5 py-1">
              {[...Array(comment.rating)].map((_, starIndex) => (
                <Ionicons
                  key={`full-${starIndex}`}
                  name="star"
                  size={20}
                  color={textRatingColor}
                />
              ))}
              {[...Array(5 - comment.rating)].map((_, starIndex) => (
                <Ionicons
                  key={`outline-${starIndex}`}
                  name="star-outline"
                  size={20}
                  color={textRatingColor}
                />
              ))}
              <Text
                style={{
                  fontFamily: "LexSemiBold",
                  color: isDarkMode ? "#FFFFFF70" : "#00000070",
                  fontSize: 16,
                  paddingLeft: 5,
                }}
              >
                {comment.date}
              </Text>
            </View>

            {/* Komentar */}
            <Text
              className={`text-base font-semibold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "LexSemiBold" }}
            >
              {isExpanded ? comment.comment : previewText}
            </Text>

            {/* Button Baca Selengkapnya */}
            <TouchableOpacity
              onPress={() => toggleComment(comment.id)}
              className="mt-2"
            >
              <Text
                style={{
                  fontFamily: "LexSemiBold",
                  color: isDarkMode ? "#0FC348" : "#159778",
                }}
              >
                {isExpanded ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
              </Text>
            </TouchableOpacity>

            {/* Garis Pembatas (hanya sebelum komentar terakhir) */}
            {!isLastComment && (
              <View
                className="h-px w-full my-5"
                style={{ backgroundColor: isDarkMode ? "white" : "black" }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default MyTextComment;
