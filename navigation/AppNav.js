import { View } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, Dashboard } from "../screens";
import { ActivityIndicator } from "react-native-paper";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";
import { BottomTabs } from "../navigation/HomeNavigator";
const Stack = createNativeStackNavigator();

export default function AppNav() {
  //get value from login

  const { isLoading, userToken } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"}></ActivityIndicator>
        </View>
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {userToken !== null ? ( // user token has been set
            <Stack.Screen name="main" component={BottomTabs} />
          ) : (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
