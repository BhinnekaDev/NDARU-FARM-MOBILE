import React, { Fragment } from "react";
import { View, Text, Image } from "react-native";

import { UserProfileProps } from "@/interfaces/UserProfileProps";

const UserProfile = ({
  imageUrl, //
  name,
  email,
  containerImageClassName = "",
  ImageClassName = "",
  nameClassName = "",
  emailClassName = "",
}: UserProfileProps) => {
  return (
    // User Profile Component
    <Fragment>
      <View className={containerImageClassName}>
        <Image source={{ uri: imageUrl }} className={ImageClassName} />
      </View>
      <Text className={nameClassName}>{name}</Text>
      <Text className={emailClassName}>{email}</Text>
      {/* <View className="w-36 h-36 rounded-full border-4 border-gray-500 flex items-center justify-center mt-10 overflow-hidden">
        <Image source={{ uri: imageUrl }} className="w-full h-full" />
      </View>
      <Text className="text-white text-xl font-bold mt-4">{name}</Text>
      <Text className="text-gray-400 text-lg underline">{email}</Text> */}
    </Fragment>
  );
};

export default UserProfile;
