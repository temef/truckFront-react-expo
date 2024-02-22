import React, { forwardRef } from "react";
import { Image, StyleSheet } from "react-native";

export const ImageViewer = forwardRef<Image, { selectedImage: string }>(
  function ImageViewer({ selectedImage }, ref) {
    const imageSource = { uri: selectedImage };

    return <Image ref={ref} source={imageSource} style={styles.image} />;
  },
);

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
