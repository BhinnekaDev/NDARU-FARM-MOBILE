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
    </Fragment>
  );
};

export default UserProfile;
