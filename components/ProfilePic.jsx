import { View, Image } from "react-native";

import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

export default function ProfilePic() {
  const { userInfo } = useContext(AuthContext);

  return (
    <View>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
          shadowRadius: 6.68,

          elevation: 2,
          resizeMode: "contain",
        }}
        source={{ uri: userInfo.profile_IMG }}
      />
    </View>
  );
}
