import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./BaseModule/Redux/Store/ConfigureStore";
import AppNavigation from "./nadiswaraPro/Navigation/AppNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate bootstrapped={true} persistor={persistor}>
        <StatusBar backgroundColor={"#E5ECF9"} barStyle="dark-content" />
        <ToastProvider>
          <AppNavigation initialRouteName="launchscreen" />
        </ToastProvider>
      </PersistGate>
    </Provider>
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
