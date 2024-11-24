import {
  Button,
  ButtonText,
  Card,
  LinearGradient,
  Text,
  VStack,
} from "@/components/ui";
import { Box } from "@/components/ui/box";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import React, { useState } from "react";
import { ActivityIndicator, Keyboard } from "react-native";
import { Toast } from "react-native-toast-notifications";
import { useDispatch, useSelector } from "react-redux";
import EnterAmountComponent from "../Components/EnterAmountComponent";
import {
  addBalanceError,
  addBalanceRequest,
} from "../Redux/Actions/MyprofileAction";
import { addBalanceSelector } from "../Redux/Reducer/MyprofileSelector";

export const AddBalanceScreen = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (updatedAmount: number) => {
    setAmount(updatedAmount);
  };

  const dispatch = useDispatch();

  const addBalalnceState = useSelector((state) => addBalanceSelector(state));

  return (
    <SafeAreaView className="w-full h-full">
      <LinearGradient
        className="flex-1"
        colors={["#6a1a57", "#6a1a57", "#FFFFFF", "#FFFFFF"]}
        locations={[0, 0.3, 0.3, 1]}
      >
        <ScrollView
          className="w-full flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <VStack className="flex-1 px-6 mt-32">
            <Card
              size="lg"
              variant="elevated"
              className="w-full h-[194px] bg-white rounded-[20px] shadow "
            >
              <EnterAmountComponent onAmountChange={handleAmountChange} />
            </Card>
            <Box className="w-full h-[120px] bg-white rounded-xl border border-[#dedede] justify-center p-4 mt-24">
              <Text className="text-[#848484] text-md py-2 font-normal">
                *Wallet balance can be used only for in app purchases
              </Text>
              <Text className="text-[#848484] text-md py-2 font-normal">
                *Wallet balance cannot be transferred into bank account
              </Text>
            </Box>
          </VStack>
        </ScrollView>
        {/* Add button positioned at the bottom */}
        <VStack className="px-6 pb-4 bg-white mt-8">
          <Button
            onPress={() => {
              if (amount > 0) {
                Keyboard.dismiss();
                dispatch(
                  addBalanceRequest({
                    amount,
                  })
                );
                console.log("Amount:", amount); // Log the current amount
              } else {
                Toast.show("Enter the amount greater then 0", {
                  type: "danger",
                  placement: "bottom",
                  duration: 3000,
                  animationType: "zoom-in",
                  successColor: "red",
                });
                dispatch(
                  addBalanceError({ message: "Please enter valid amount" })
                );
              }
            }}
            size="xl"
            variant="solid"
            action="primary"
            className="w-full"
          >
            {addBalalnceState?.isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <ButtonText className="font-medium" children="Add" />
            )}
          </Button>
        </VStack>
      </LinearGradient>
    </SafeAreaView>
  );
};
