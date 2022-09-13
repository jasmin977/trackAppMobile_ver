import { View, Text } from "react-native";
import React from "react";

export default function Today() {
  var days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  var months = [
    "Jan",
    "Feb",
    "Mars",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 17 }}>
        {` ${days[new Date().getDay()]}, ${
          months[new Date().getMonth()]
        } ${new Date().getDate()} `}
      </Text>
    </View>
  );
}
