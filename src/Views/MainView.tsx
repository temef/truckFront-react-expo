import domtoimage from "dom-to-image";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// eslint-disable-next-line import/order
import { captureRef } from "react-native-view-shot";
import { useImageContext } from "../Providers/ImageProvider";
import Button from "../components/Button";
import { ImageViewer } from "../components/ImageViewer";
import { useTypedNavigation } from "../hooks/useTypedNavigation";

// xCode

export const MainView = () => {
  const { selectedImage, setSelectedImage } = useImageContext();

  const { navigate } = useTypedNavigation();
  const [imageScanned, setImageScanned] = React.useState<boolean>(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);

  const [permission, requestPermissionCamera] = Camera.useCameraPermissions();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  console.log(permission);
  const imageRef = useRef();

  Camera.requestCameraPermissionsAsync();

  React.useEffect(() => {
    requestPermission();
    requestPermissionCamera();
  }, [requestPermission, requestPermissionCamera]);

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

  // aina kun kuva vaihtuu niin myös scannaus puuttuu
  React.useEffect(() => {
    setImageScanned(false);
  }, [selectedImage]);

  const onSaveImageAsync = async () => {
    console.log("onSaveImageAsync", imageRef);
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef);

        // // tähän se fetch bäkkäri?
        // const data = await fetch("localhost:5001/scan", {
        //   body: localUri,
        // });

        // const resp = await data.json()

        // // respissä ois uus image, missä renkaat?
        // voitais viel päivittää setSelectedImage(resp.image)
        setImageScanned(true);

        console.log("poggg", localUri);
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
              <ImageViewer ref={imageRef} selectedImage={selectedImage} />
              {!imageScanned ? (
                <Button
                  theme="secondary"
                  label="Scan"
                  onPress={onSaveImageAsync}
                />
              ) : null}
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
              navigate("Camera");
            }}
          />
        </View>
      </View>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
};

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
    flex: 1 / 8,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },

  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    flex: 1,

    width: "100%",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
