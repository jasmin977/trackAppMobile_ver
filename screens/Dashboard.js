import React, { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";

import { SafeAreaView, Text, View, StatusBar } from "react-native";
import { Clocking, ProfilePic, Today } from "../components";
import Ionicons from "@expo/vector-icons/Ionicons";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { SocketContext } from "../context/socketProvider";

let setStateFn = () => {
  console.log("State not yet initialized");
};
let socket = null;
function myTask() {
  try {
    // fetch data here...
    const backendData = "Simulated fetch " + Math.random();
    console.log("myTask() ", backendData);
    setStateFn(backendData);
    // setInterval(() => console.log("i'm cool still working 💪"), 1000);

    return backendData
      ? BackgroundFetch.BackgroundFetchResult.NewData
      : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (err) {
    console.log(err);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
}
async function initBackgroundFetch(taskName, taskFn, interval = 60 * 15) {
  try {
    if (!TaskManager.isTaskDefined(taskName)) {
      TaskManager.defineTask(taskName, taskFn);
    }
    const options = {
      minimumInterval: interval, // in seconds
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    };
    await BackgroundFetch.registerTaskAsync(taskName, options);
  } catch (err) {
    console.log("registerTaskAsync() failed:", err);
  }
}

initBackgroundFetch("myTaskName", myTask, 1);

export default function Dashboard({ navigation }) {
  const { logout, userInfo } = useContext(AuthContext);
  // console.log(userInfo);
  socket = useContext(SocketContext).socket;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      {/* <Button mode="outlined" onPress={() => logout()}>
        Logout
      </Button> */}
      <View
        style={{
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Today />
        </View>
        <ProfilePic />
      </View>
      <View
        style={{ paddingVertical: 30, alignItems: "flex-start", padding: 5 }}
      >
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Hello,
        </Text>
        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              letterSpacing: 1,
              color: "#f27457",
            }}
          >
            {userInfo.firstname}
          </Text>
          <View
            style={{
              backgroundColor: "#f27457",
              height: 5,

              marginTop: -5,
            }}
          >
            <Text style={{ color: "transparent" }}> {userInfo.firstname}</Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: "flex-start" }}>
        <Text style={{ fontWeight: "700", fontSize: 20, letterSpacing: 1 }}>
          You Are Currently{" "}
        </Text>
        {userInfo.status === "absent" ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 20, letterSpacing: 1 }}>
              Checked Out
            </Text>
            <Ionicons
              style={{ paddingHorizontal: 5 }}
              name="checkbox"
              size={25}
              color="red"
            />
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontWeight: "700", fontSize: 20, letterSpacing: 1 }}>
              Checked In
            </Text>
            <Ionicons
              style={{ paddingHorizontal: 5 }}
              name="checkbox"
              size={25}
              color="green"
            />
          </View>
        )}
      </View>
      <View>
        <Clocking />
      </View>
      <Text>{userInfo.status}</Text>
    </SafeAreaView>
  );
}
