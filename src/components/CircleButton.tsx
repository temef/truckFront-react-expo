/* eslint-disable react-native/no-color-literals */
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function CircleButton({ onPress }) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButton: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 42,
    flex: 1,
    justifyContent: "center",
  },
  circleButtonContainer: {
    borderColor: "#ffd33d",
    borderRadius: 42,
    borderWidth: 4,
    height: 84,
    marginHorizontal: 60,
    padding: 3,
    width: 84,
  },
});
