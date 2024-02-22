import { Camera, CameraType } from "expo-camera";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useImageContext } from "../Providers/ImageProvider";
import CircleButton from "../components/CircleButton";
import { useTypedNavigation } from "../hooks/useTypedNavigation";

type CameraViewerProps = {
  onPress: () => void;
};

export default function CameraViewer({ onPress }: CameraViewerProps) {
  const cameraRef = useRef<Camera>(null);

  const { navigate } = useTypedNavigation();

  const { setSelectedImage } = useImageContext();

  const takePicture = async () => {
    const data = await cameraRef.current.takePictureAsync();
    setSelectedImage(data.uri);
    navigate("HomeScreen");
  };

  const [cameraType, setCameraType] = useState(CameraType.back);

  const toggleCameraType = async () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  };
  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={cameraType}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCameraType}>
            <Text style={styles.buttonLabel}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            {/* <IconButton icon="refresh" label="Reset" onPress={() => {}} /> */}
            <CircleButton onPress={takePicture} />
            {/* <IconButton icon="save-alt" label="Save" onPress={() => {}} /> */}
          </View>
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
  optionsContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
