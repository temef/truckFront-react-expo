/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import { StyleSheet, View } from "react-native";

import CircleButton from "./CircleButton";
import IconButton from "./IconButtons";

export const AppOptions = (): JSX.Element => {
  return (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsRow}>
        <IconButton icon="refresh" label="Reset" onPress={() => {}} />
        <CircleButton onPress={() => {}} />
        <IconButton icon="save-alt" label="Save" onPress={() => {}} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  optionsContainer: {
    bottom: 80,
    position: "absolute",
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
