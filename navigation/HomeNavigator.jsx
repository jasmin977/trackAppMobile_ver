import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Dashboard, Profile, Notification } from "../screens";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef } from "react";
import "react-native-gesture-handler";
import CheckInOutButton from "../components/CheckButton";
const Tab = createBottomTabNavigator();
export const BottomTabs = () => {
  function getWidth() {
    let width = Dimensions.get("window").width;

    // Horizontal Padding = 20...
    width = width - 80;

    // Total five Tabs...
    return width / 5;
  }
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          tabBarStyle: {
            bottom: 20,

            paddingHorizontal: 20,
            borderRadius: 10,
            left: 20,
            right: 20,
            backgroundColor: "#F5F7FB",
            position: "absolute",
            height: 80,
            // Shadow...
            shadowColor: "#000",
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            paddingHorizontal: 20,
          },
        })}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName;
              let color;

              iconName = focused ? "home" : "home-outline";
              color = focused ? "red" : "gray";

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={30} color={color} />;
            },
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="page"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => <CheckInOutButton />,
          }}
        />
        <Tab.Screen
          name="settings"
          component={Notification}
          options={{
            tabBarIcon: ({ focused }) => {
              let iconName;
              let color;

              iconName = focused ? "settings" : "settings-outline";
              color = focused ? "red" : "gray";

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={30} color={color} />;
            },
          }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.5,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth(),
          height: 2,
          backgroundColor: "red",
          position: "absolute",
          bottom: 98,
          // Horizontal Padding = 20...
          left: 50,
          borderRadius: 20,
          transform: [{ translateX: tabOffsetValue }],
        }}
      ></Animated.View>
    </>
  );
};
