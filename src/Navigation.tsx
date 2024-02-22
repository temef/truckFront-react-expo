import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, View } from "react-native";
import { ImageProvider } from "./Providers/ImageProvider";
import CameraViewer from "./Views/CameraViewer";
import { MainView } from "./Views/MainView";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export type RootStackParamList = {
  HomeScreen: undefined;
  Camera: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <ImageProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={MainView} />
          <Stack.Screen name="Camera" component={CameraViewer} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageProvider>
  );
};
