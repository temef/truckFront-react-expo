import domtoimage from "dom-to-image";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import React from "react";
import Button from "../components/Button";
import ImageViewer from "../components/ImageViewer";

// xCode

export const MainView = () => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermissionCamera] = Camera.useCameraPermissions();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  console.log(permission);
  const imageRef = useRef();

  Camera.requestCameraPermissionsAsync();

  React.useEffect(() => {
    requestPermission();
    requestPermissionCamera();
  }, []);

  if (status === null) {
    requestPermission();
    requestPermissionCamera();
  }

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const toggleCameraType = async () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current);

        const link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);

      setShowCamera(false);
    } else {
      alert("You did not select any image.");
    }
  };
  console.log(selectedImage);
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        {!selectedImage ? (
          <View style={styles.textContainer}>
            <Text>Ota tai valitse kuva</Text>
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <View style={styles.image}>
              <ImageViewer selectedImage={selectedImage} />

              <Button theme="secondary" label="Scan" onPress={() => {}} />
            </View>
          </View>
        )}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.optionsRow}>
          <Button
            theme="photo"
            label="Choose a photo"
            onPress={pickImageAsync}
          />

          <Button
            theme="camera"
            label="Take a photo"
            onPress={() => {
              setShowCamera(true);
            }}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
};
{
  /* <View style={{ marginTop: 10 }}>
<Button
  theme="secondary"
  label="Use this photo"
  onPress={() => setShowAppOptions(true)}
/>
</View> */
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",

    width: "100%",
  },
  imageContainer: {
    flex: 1,

    width: "100%",

    backgroundColor: "yellow",
  },

  footerContainer: {
    flex: 1 / 4,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    flex: 1,
    backgroundColor: "red",
    width: "100%",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
