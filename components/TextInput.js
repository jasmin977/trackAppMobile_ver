import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

export default function TextInput({ name, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor="white"
        underlineColor="black"
        placeholderTextColor="#FFF"
        name={name}
        mode="flat"
        {...props}
      />

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: "transparent",
    placeholderTextColor: "#fff",
  },
  description: {
    fontSize: 13,
    color: theme.colors.white,
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
  },
});
