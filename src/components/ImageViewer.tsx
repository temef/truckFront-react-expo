import React from "react";
import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ selectedImage }) {
  const imageSource = { uri: selectedImage };

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
