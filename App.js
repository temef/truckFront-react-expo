import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Camera, CameraType } from "expo-camera";
import { captureRef } from "react-native-view-shot";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import domtoimage from "dom-to-image";

import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButtons";
import EmojiPicker from "./components/EmojiPicker";
import EmojiList from "./components/EmojiList";
import EmojiSticker from "./components/EmojiSticker";
import CameraViewer from "./components/CameraViewer";

import { useState, useRef } from "react";

const PlaceholderImage = require("./assets/images/background-image.png");

// xCode

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermissionCamera] = Camera.useCameraPermissions();
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  if (status === null) {
    requestPermission();
    requestPermissionCamera();
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

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
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      setShowCamera(false);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {showCamera ? (
            <View>
              <CameraViewer onPress={toggleCameraType} type={type} />
            </View>
          ) : (
            <View ref={imageRef} collapsable={false}>
              <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
              />
              {pickedEmoji && (
                <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
              )}
            </View>
          )}
        </View>
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <View style={styles.optionsRow}>
              <Button
                theme="photo"
                label="Choose a photo"
                onPress={pickImageAsync}
              />
              {showCamera && showAppOptions ? (
                <View style={styles.optionsContainer}>
                  <View style={styles.optionsRow}>
                    <IconButton
                      icon="refresh"
                      label="Reset"
                      onPress={onReset}
                    />
                    <CircleButton onPress={onAddSticker} />
                    <IconButton
                      icon="save-alt"
                      label="Save"
                      onPress={onSaveImageAsync}
                    />
                  </View>
                </View>
              ) : (
                <Button
                  theme="camera"
                  label="Take a photo"
                  onPress={() => {
                    setShowCamera(true), setShowAppOptions(true);
                  }}
                />
              )}
            </View>

            <View style={{ marginTop: 10 }}>
              <Button
                theme="secondary"
                label="Use this photo"
                onPress={() => setShowAppOptions(true)}
              />
            </View>
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 56,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
    flexDirection: "column",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
