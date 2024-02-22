import { Camera, CameraType } from "expo-camera";
import React, { useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CameraViewerProps = {
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
  onPress: () => void;
  type: CameraType;
};

export default function CameraViewer({
  onPress,
  type,
  setSelectedImage,
}: CameraViewerProps) {
  const cameraRef = useRef<Camera>(null);

  const takePicture = async () => {
    const data = await cameraRef.current.takePictureAsync();
    setSelectedImage(data.uri);
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.buttonLabel}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "red",
  },
  buttonContainer: {
    width: 170, //"45%",
    height: 68, //"60%",
    marginHorizontal: 10, //"3%",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
