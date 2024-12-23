import React, { useEffect, useState } from "react";

import LottieAnimation from "@/AppModules/Authentication/Utils/lottie";
import { Heading, Text, VStack } from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { Toast } from "react-native-toast-notifications";
import { UsbSerialManager } from "react-native-usb-serialport-for-android";
import { useDispatch } from "react-redux";
import { handleNavigation } from "../../../nadiswaraPro/Navigation/NaviagationHelper";
import { checkUserDeviceRequest } from "../Redux/Actions/HomeAction";

interface DeviceState {
  usbAttached: boolean;
  deviceId: number;
}

const DeviceConnection = () => {
  const [state, setState] = useState<DeviceState>({
    usbAttached: false,
    deviceId: 0,
  });
  const [status, setStatus] = useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeUsb();
  }, []);

  const initializeUsb = async (): Promise<void> => {
    try {
      const devices = await UsbSerialManager.list();

      if (devices && devices.length > 0) {
        dispatch(
          checkUserDeviceRequest({ device_id: String(devices[0]?.deviceId) })
        );
        setState((prev) => ({
          ...prev,
          usbAttached: true,
          deviceId: devices[0]?.deviceId,
        }));

        setStatus(1);
      } else {
        setStatus(0);
        Toast.show("No USB devices found", {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    } catch (error: unknown) {
      setStatus(0);
    }
  };

  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      <LottieAnimation
        animationSource={require("../../../assets/lottie/deviceConnection.json")}
        width={300}
        height={300}
        containerStyle={{ backgroundColor: "#ffffff" }}
      />
      <Heading className="text-xl font-ClashMedium pt-4">
        Connecting to sensor...
      </Heading>
      <Pressable onPress={() => handleNavigation("AnalysePulse")}>
        <Text className="text-base color-primary-prime font-ClashRegular">
          1 Device found
        </Text>
      </Pressable>
    </VStack>
  );
};

export default DeviceConnection;
