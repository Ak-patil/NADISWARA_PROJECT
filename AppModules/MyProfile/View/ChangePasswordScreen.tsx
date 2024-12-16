import { VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deviceEnrolmentSelector } from "../Redux/Reducer/MyprofileSelector";

export const ChangePasswordScreen = () => {
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
        <VStack space="2xl" className="flex-1  px-6 mt-16"></VStack>
      </ScrollView>
    </SafeAreaView>
  );
};
