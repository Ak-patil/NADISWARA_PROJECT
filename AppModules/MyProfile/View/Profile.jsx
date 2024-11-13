import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import {
  Codes,
  Parity,
  UsbSerialManager,
} from "react-native-usb-serialport-for-android";
import { styles } from "../Style/ProfileScreenStyles/ProfileScreen.styles";

const Profile = () => {
  const [status, setStatus] = useState("Idle");

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleUsbCommunication = async () => {
    setStatus("Attempting to communicate with USB...");
    try {
      const devices = await UsbSerialManager.list();
      console.log("Devices:", devices);

      await UsbSerialManager.tryRequestPermission(2004);
      const usbSerialport = await UsbSerialManager.open(2004, {
        baudRate: 38400,
        parity: Parity.None,
        dataBits: 8,
        stopBits: 1,
      });

      const sub = usbSerialport.onReceived((event) => {
        console.log("Received data:", event.deviceId, event.data);
        setStatus(`Received data: ${event.data}`);
      });

      await usbSerialport.send("00FF");
      setStatus("Data sent successfully");

      // Clean up and close the connection
      sub.remove();
      await usbSerialport.close();
    } catch (err) {
      console.log(err);
      if (err.code === Codes.DEVICE_NOT_FOUND) {
        setStatus("Device not found");
      } else {
        setStatus(`Error: ${err.message}`);
      }
    }
  };
  return (
    <>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.status}>{status}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleUsbCommunication}
          >
            <Text style={styles.buttonText}>Start USB Communication</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Profile;
