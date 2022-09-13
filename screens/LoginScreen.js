import React, { useContext, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";

import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    matricul: "c1c1123456",
    password: "123456",
  });

  const onLoginPressed = () => {
    if (values.password !== "" && values.matricul !== "") {
      login(values);
    }
  };

  return (
    <Background>
      <Text
        style={{
          fontSize: 20,
          color: "#fff",

          paddingTop: 5,
        }}
      >
        Login to
      </Text>
      <Text
        style={{
          fontSize: 30,
          color: "#fff",
          fontWeight: "bold",
          paddingVertical: 12,
        }}
      >
        WselTrack
      </Text>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 20,
          width: "100%",

          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          label="matricule"
          name="matricul"
          value={values.matricul}
          onChangeText={(text) =>
            setValues({
              ...values,
              matricul: text,
            })
          }
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          name="password"
          value={values.password}
          onChangeText={(text) =>
            setValues({
              ...values,
              password: text,
            })
          }
        />

        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginVertical: 24,
          }}
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 13, color: "black" }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },

  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
