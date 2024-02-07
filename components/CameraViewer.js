import { Camera, CameraType } from "expo-camera";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraViewer({ onPress, type }) {
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 320,
    height: 500,
    borderRadius: 18,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
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
