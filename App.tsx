import domtoimage from "dom-to-image";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { Platform } from "react-native";
import { captureRef } from "react-native-view-shot";

import React from "react";
import { Navigation } from "./src/Navigation";

const PlaceholderImage = require("./assets/images/background-image.png");

// xCode

export default function App() {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

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
  }, [requestPermission, requestPermissionCamera]);

  if (status === null) {
    requestPermission();
    requestPermissionCamera();
  }

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
      setShowAppOptions(true);
      setShowCamera(false);
    } else {
      alert("You did not select any image.");
    }
  };

  return <Navigation />;
}
