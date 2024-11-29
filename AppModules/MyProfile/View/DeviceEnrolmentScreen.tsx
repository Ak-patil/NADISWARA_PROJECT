import { Button, ButtonText, Text, VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deviceEnrolmentSelector } from "../Redux/Reducer/MyprofileSelector";

export const DeviceEnrolmentScreen = () => {
  const dispatch = useDispatch();

  const handleSubmit = (): void => {
    // dispatch(deviceEnrolmentRequest());
  };

  const deviceEnrolmentState = useSelector((state) =>
    deviceEnrolmentSelector(state)
  );

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack space="2xl" className="flex-1  px-6 mt-16">
          <Text size="2xl" className="text-text-text1 font-ClashMedium">
            Device Enrollment
          </Text>
          <Text size="lg" className="text-text-text1 font-ClashRegular">
            Enroll this device to enable secure, convenient access and efficient
            management.
          </Text>
          <VStack className="pb-4 bg-white">
            <Button
              onPress={() => handleSubmit()}
              size="xl"
              variant="solid"
              action="primary"
              className="w-full"
            >
              <ButtonText
                size="lg"
                className="font-ClashMedium"
                children={"Enroll this Device"}
              />
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
