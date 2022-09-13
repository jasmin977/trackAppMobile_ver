import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";
export default function CheckInOutButton() {
  const BASE_URL = "http://192.168.1.215:5000";
  const { userInfo, setUserInfo, userToken } = useContext(AuthContext);
  const [loggedInUserInfo, setloggedInUserInfo] = useState();
  const [loading, setLoading] = useState(false);
  let userId = userInfo.employee;

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/employee/${userToken}`);
      setloggedInUserInfo(res.data);
      setUserInfo(res.data);
      console.log(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, []);

  const status = (status) => {
    return !(status === "absent");
  };

  const checkinout = async () => {
    console.log(`user info`, loggedInUserInfo);
    if (!status(loggedInUserInfo.status)) {
      console.log("about to check in");
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/employee/${userToken}`
        );
        fetchData();
        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 100,
          top: -10,
          backgroundColor: "white",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: Platform.OS == "android" ? 50 : 30,
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"}></ActivityIndicator>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 100,
        top: -10,
        backgroundColor: "white",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: Platform.OS == "android" ? 50 : 30,
      }}
    >
      <TouchableOpacity
        onPress={() => checkinout()}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          borderRadius: 100,
        }}
      >
        <Ionicons name="finger-print-outline" size={60} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
