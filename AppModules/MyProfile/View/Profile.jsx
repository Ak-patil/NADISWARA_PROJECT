import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Codes,
  Parity,
  UsbSerialManager,
} from "react-native-usb-serialport-for-android";

const Profile = () => {
  const [state, setState] = useState({
    connected: false,
    usbAttached: false,
    output: "",
    sendText: "HELLO",
    deviceId: null,
    usbSerialport: null,
  });

  const [graphData, setGraphData] = useState([]);
  const [status, setStatus] = useState("Idle");
  const [pulseDataArray, setPulseDataArray] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const ANALYZE_ENDPOINT =
    "https://nadiswarapro-backend-test.online/api/v1/pulse_service/analyse_pulse/";
  const ACCESS_TOKEN = "Bearer YOUR_ACCESS_TOKEN";

  useEffect(() => {
    const timer = setTimeout(() => initializeUsb(), 500);
    return () => {
      clearTimeout(timer);
      closeConnection();
    };
  }, []);

  const initializeUsb = async () => {
    try {
      const devices = await UsbSerialManager.list();
      console.log("Devices:", devices);

      if (devices && devices.length > 0) {
        setState((prev) => ({
          ...prev,
          usbAttached: true,
          deviceId: devices[0].deviceId,
        }));
        connectToDevice(devices[0].deviceId);
      } else {
        setStatus("No USB devices found");
      }
    } catch (error) {
      console.error("USB Initialization Error:", error);
      // setStatus(Error initializing USB: ${error.message});
    }
  };

  const connectToDevice = async (deviceId) => {
    try {
      await UsbSerialManager.tryRequestPermission(deviceId);
      const serialport = await UsbSerialManager.open(deviceId, {
        baudRate: 115200,
        parity: Parity.None,
        dataBits: 8,
        stopBits: 1,
      });

      let lastPulseTime = Date.now();
      const pulseIntervalThreshold = 300; // Minimum interval (ms) between valid pulses
      const maxBufferSize = 20;
      const pulseRange = { min: 500, max: 1500 }; // Acceptable range for pulse values

      let subscription;
      try {
        subscription = serialport.onReceived((event) => {
          const hexData = event.data;
          console.log("hexData", hexData);
          if (!hexData) return;

          const decimalValue = hexData
            .match(/.{1,2}/g)
            ?.map((byte) => parseInt(byte, 16))
            ?.reduce((acc, val) => acc + val, 0);

          // Check if the value is within the valid range
          if (
            typeof decimalValue === "number" &&
            decimalValue >= pulseRange.min &&
            decimalValue <= pulseRange.max
          ) {
            const currentTime = Date.now();

            // Only log data if it meets the pulse interval threshold
            if (currentTime - lastPulseTime > pulseIntervalThreshold) {
              lastPulseTime = currentTime;

              setGraphData((prevData) => {
                const newData = [
                  ...prevData,
                  {
                    time: new Date().toLocaleTimeString(),
                    value: decimalValue,
                  },
                ];
                return newData.slice(-maxBufferSize); // Maintain only recent data points
              });

              // Append to state output
              setState((prev) => ({
                ...prev,
                output: prev.output + decimalValue + "\n",
              }));

              // console.log(Pulse detected: ${decimalValue});
            }
          } else {
            // If no valid pulse is detected, add a linear 0 value to the graph

            setGraphData((prevData) => {
              const newData = [
                ...prevData,
                { time: new Date().toLocaleTimeString(), value: 0 },
              ];
              return newData.slice(-maxBufferSize); // Maintain only recent data points
            });
          }
        });
      } catch (error) {
        console.error("Subscription Error:", error);
        // setStatus(Error setting up data subscription: ${error.message});
        return;
      }

      setState((prev) => ({
        ...prev,
        connected: true,
        usbSerialport: serialport,
      }));
      setStatus("Connected to device");

      // Optional: Indicate readiness after a delay
      setTimeout(() => {
        console.log("Device is ready for data collection.");
        setIsReady(true);
      }, 500);

      return () => {
        if (subscription?.remove) {
          subscription.remove();
        }
      };
    } catch (err) {
      console.error("Connection Error:", err);
      if (err.code === Codes.DEVICE_NOT_FOUND) {
        setStatus("Device not found");
      } else {
        // setStatus(Error: ${err.message});
      }
    }
  };

  const closeConnection = async () => {
    if (state.usbSerialport) {
      try {
        await state.usbSerialport.close();
        setState((prev) => ({
          ...prev,
          connected: false,
          usbSerialport: null,
          output: "",
        }));
        setGraphData([]);
        setStatus("Connection closed");
        setIsReady(false);
      } catch (error) {
        console.error("Error closing connection:", error);
        // setStatus(Error closing connection: ${error.message});
      }
    }
  };

  const startDataCollection = () => {
    if (!isReady) {
      Alert.alert(
        "Error",
        "Device is not ready. Please wait a moment and try again."
      );
      return;
    }

    setIsCollecting(true);
    setPulseDataArray([]);
    setGraphData([]); // Clear graph data for new collection
    console.log("Data collection started.");
    const collectionStartTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor(
        (currentTime - collectionStartTime) / 1000
      );

      // Simulate pulse data collection (replace with actual data if available)
      const randomValue = Math.random() * 100; // Replace this with your real data fetching logic

      setGraphData((prevData) => {
        const newData = [
          ...prevData,
          { time: elapsedSeconds % 10, value: randomValue }, // Ensure time loops within the 10-second window
        ];
        return newData.slice(-10); // Keep only the last 10 points
      });

      setPulseDataArray((prevData) => [...prevData, randomValue.toFixed(2)]);

      if (elapsedSeconds >= 10) {
        clearInterval(intervalId);
        setIsCollecting(false);
        console.log("Data collection completed:", pulseDataArray);
      }
    }, 1000);
  };

  //console.log('Graph Data being passed to USBReadingsGraph:', graphData);

  const sendPulseDataToBackend = async () => {
    if (pulseDataArray.length === 0) {
      Alert.alert("Error", "No data to analyze. Start data collection first.");
      return;
    }

    try {
      const signalDataString = pulseDataArray.join(","); // Use pulseDataArray
      const payload = { patient_id: "79", signal_data: signalDataString };

      console.log("Sending payload:", payload);

      const response = await axios.post(ANALYZE_ENDPOINT, payload, {
        headers: {
          Authorization: ACCESS_TOKEN,
          "Content-Type": "application/json",
        },
      });

      console.log("Pulse data sent successfully:", response.data);
      Alert.alert("Success", "Pulse data analyzed successfully.");
    } catch (error) {
      console.error("Error sending pulse data:", error.response?.data || error);
      Alert.alert("Error", "Failed to analyze pulse data. Please try again.");
    }
  };
  // console.log('Graph Data:', graphData);
  //console.log('Is Collecting:', isCollecting);

  const handleClearButton = () => {
    setState((prev) => ({
      ...prev,
      output: "",
    }));
    setGraphData([]);
  };

  const buttonStyle = (isActive) => {
    return isActive
      ? styles.button
      : { ...styles.button, backgroundColor: "#C0C0C0" };
  };
  const scrollViewRef = useRef(null);
  return (
    <ScrollView style={styles.body}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.line}>
            <Text style={styles.title}>Status:</Text>
            <Text
              style={[
                styles.value,
                { color: state.connected ? "green" : "black" },
              ]}
            >
              {status}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>USB:</Text>
            <Text style={styles.value}>
              {state.usbAttached ? "Attached" : "Not Attached"}
            </Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.title}>Connection:</Text>
            <Text style={styles.value}>
              {state.connected ? "Connected" : "Not Connected"}
            </Text>
          </View>
          {state.deviceId && (
            <View style={styles.line}>
              <Text style={styles.title}>Device ID:</Text>
              <Text style={styles.value}>{state.deviceId}</Text>
            </View>
          )}
        </View>

        {/* {state.connected && <USBReadingsGraph data={graphData} isCollecting={isCollecting} />} */}

        <ScrollView style={styles.output} nestedScrollEnabled={true}>
          <Text>{state.output === "" ? "No Content" : state.output}</Text>
        </ScrollView>

        <View style={styles.line2}>
          <TouchableOpacity style={styles.button} onPress={handleClearButton}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={buttonStyle(!state.connected)}
            onPress={!state.connected ? initializeUsb : closeConnection}
          >
            <Text style={styles.buttonText}>
              {state.connected ? "Disconnect" : "Connect"}
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title={isCollecting ? "Collecting Data..." : "Start Data Collection"}
          onPress={startDataCollection}
          disabled={isCollecting}
        />

        <TouchableOpacity
          style={
            pulseDataArray.length > 0 && !isCollecting
              ? styles.analyzeButtonActive
              : styles.analyzeButtonDisabled
          }
          onPress={sendPulseDataToBackend}
          disabled={pulseDataArray.length === 0 || isCollecting}
        >
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>

        {/* Display collected data */}
        <View style={styles.collectedDataSection}>
          <Text style={styles.sectionTitle}>Collected Data:</Text>
          <ScrollView
            style={styles.dataContainer}
            ref={scrollViewRef}
            onContentSizeChange={() => {
              if (pulseDataArray.length > 0) {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }
            }}
          >
            {pulseDataArray.map((data, index) => (
              <Text key={index} style={styles.dataText}>
                {index + 1}. {data}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  container: {
    flex: 1,
    margin: 16,
    marginTop: 62,
  },
  header: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#E6F7FF",
    borderRadius: 8,
    borderColor: "#B3E5FC",
    borderWidth: 1,
  },
  line: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
  },
  output: {
    marginTop: 10,
    height: 250,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    backgroundColor: "#FFF",
  },
  line2: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: "#147efb",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  analyzeButtonActive: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#28a745",
    borderRadius: 5,
    alignItems: "center",
  },
  analyzeButtonDisabled: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#C0C0C0",
    borderRadius: 5,
    alignItems: "center",
  },
  collectedDataSection: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#147efb",
  },
  dataContainer: {
    maxHeight: 300,
    padding: 5,
  },
  dataText: {
    fontSize: 16,
    marginVertical: 2,
    color: "#333",
  },
});

export default Profile;
