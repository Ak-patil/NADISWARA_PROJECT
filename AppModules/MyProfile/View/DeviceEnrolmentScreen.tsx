import LottieAnimation from "@/AppModules/Authentication/Utils/lottie";
import { Button, ButtonText, Text, VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/select/select-actionsheet";
import { Spinner } from "@/components/ui/spinner";
import React, { useEffect, useState } from "react";
import { Toast } from "react-native-toast-notifications";
import { UsbSerialManager } from "react-native-usb-serialport-for-android";
import { useDispatch, useSelector } from "react-redux";
import { deviceEnrolmentRequest } from "../Redux/Actions/MyprofileAction";
import { deviceEnrolmentSelector } from "../Redux/Reducer/MyprofileSelector";

interface DeviceState {
  usbAttached: boolean;
  deviceId: number;
}

export const DeviceEnrolmentScreen: React.FC = () => {
  const [showActionsheet, setShowActionsheet] = useState(false);
  const deviceEnrolmentState = useSelector(deviceEnrolmentSelector);

  const [state, setState] = useState<DeviceState>({
    usbAttached: false,
    deviceId: 0,
  });
  const handleClose = () => setShowActionsheet(false);

  useEffect(() => {
    if (deviceEnrolmentState?.isSuccess) {
      setShowActionsheet(deviceEnrolmentState?.isSuccess);
    }
  }, [deviceEnrolmentState]);

  const [status, setStatus] = useState<number>(0);
  const dispatch = useDispatch();

  // Redux state selector

  const initializeUsb = async (): Promise<void> => {
    try {
      const devices = await UsbSerialManager.list();
      console.log("Devices:", devices);

      if (devices && devices.length > 0) {
        dispatch(
          deviceEnrolmentRequest({ data: String(devices[0]?.deviceId) })
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
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="2xl" className="flex-1 px-6 mt-16">
          <Text size="lg" className="text-text-text1 font-ClashRegular">
            Device ID: {state?.deviceId}
          </Text>
          <Text size="2xl" className="text-text-text1 font-ClashMedium">
            Device Enrollment
          </Text>
          <Text size="lg" className="text-text-text1 font-ClashRegular">
            Enroll this device to enable secure, convenient access and efficient
            management.
          </Text>
          <VStack className="pb-4 bg-white">
            <Button
              onPress={initializeUsb}
              size="xl"
              variant="solid"
              action="primary"
              className="w-full"
            >
              {deviceEnrolmentState?.isLoading ? (
                <Spinner size="small" className="color-white" />
              ) : (
                <ButtonText
                  size="lg"
                  className="font-ClashMedium"
                  children="Enroll this Device"
                />
              )}
            </Button>
          </VStack>
          <Actionsheet
            isOpen={showActionsheet}
            onClose={handleClose}
            snapPoints={[40]}
          >
            <ActionsheetBackdrop />
            <ActionsheetContent>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>
              <VStack className="justify-between mt-8">
                <LottieAnimation
                  animationSource={require("../../../assets/lottie/success.json")}
                  width={150}
                  height={150}
                  containerStyle={{ backgroundColor: "#ffffff" }}
                />
                <Text
                  size="2xl"
                  className="font-ClashMedium text-text-text1 mt-8"
                >
                  Device enrolled successfully
                </Text>
              </VStack>
            </ActionsheetContent>
          </Actionsheet>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
