import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./BaseModule/Redux/Store/ConfigureStore";
import { GluestackUIProvider } from "./components/ui";
import "./global.css";
import AppNavigation from "./nadiswaraPro/Navigation/AppNavigation";

const fetchFonts = () => {
  return Font.loadAsync({
    "ClashGrotesk-Regular": require("./assets/fonts/ClashGrotesk-Regular.otf"),
    "ClashGrotesk-Medium": require("./assets/fonts/ClashGrotesk-Medium.otf"),
    "ClashGrotesk-Bold": require("./assets/fonts/ClashGrotesk-Bold.otf"),
    "ClashGrotesk-Semibold": require("./assets/fonts/ClashGrotesk-Semibold.otf"),
    "ClashGrotesk-Extralight": require("./assets/fonts/ClashGrotesk-Extralight.otf"),
    "ClashGrotesk-Light": require("./assets/fonts/ClashGrotesk-Light.otf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
  return (
    <GluestackUIProvider mode={"light"}>
      <Provider store={store}>
        <PersistGate bootstrapped={true} persistor={persistor}>
          <StatusBar backgroundColor={"#E5ECF9"} barStyle="dark-content" />
          <ToastProvider>
            <AppNavigation initialRouteName="launchscreen" />
          </ToastProvider>
        </PersistGate>
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
