import { View, ActivityIndicator, Text, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Clocking() {
  const BASE_URL = "http://192.168.0.133:5000";
  const [loading, setLoading] = useState(false);

  const { userClocking, setUserClocking, userToken } = useContext(AuthContext);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/employee/clocking`, {
        headers: {
          token: userToken,
        },
      });
      setUserClocking(res.data);
    } catch (error) {
      console.log(error);
      console.log("ggg");
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          borderRadius: 7,
          padding: 8,
          flex: 1,
          backgroundColor: "#a9fcb1",
          justifyContent: "space-between",
        }}
      >
        <Text>Checked In At</Text>
        <Text>{item.arrival}</Text>
      </View>
      {item.departure && (
        <View
          style={{
            marginVertical: 5,
            borderRadius: 7,
            padding: 8,
            width: "90%",
            flexDirection: "row",
            backgroundColor: "#f5af9f",
            justifyContent: "space-between",
          }}
        >
          <Text>Checked Out At</Text>
          <Text>{item.departure}</Text>
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <View>
      {/* <FlatList
        data={userClocking}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
      <ScrollView style={{ marginVertical: 50 }}>
        {userClocking.map((item, idx) => (
          <View style={{ width: "100%" }} key={idx}>
            <View
              style={{
                flexDirection: "row",
                marginVertical: 5,
                borderRadius: 7,
                padding: 8,
                flex: 1,
                backgroundColor: "#a9fcb1",
                justifyContent: "space-between",
              }}
            >
              <Text>Checked In At</Text>
              <Text>{item.arrival}</Text>
            </View>
            {item.departure && (
              <View
                style={{
                  marginVertical: 5,
                  borderRadius: 7,
                  padding: 8,
                  width: "100%",
                  flexDirection: "row",
                  backgroundColor: "#f5af9f",
                  justifyContent: "space-between",
                }}
              >
                <Text>Checked Out At</Text>
                <Text>{item.departure}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
