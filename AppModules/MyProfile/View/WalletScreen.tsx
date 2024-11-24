import {
  getBalanceSelector,
  walletTransactionsSelector,
} from "@/AppModules/MyProfile/Redux/Reducer/MyprofileSelector";
import { getFormatedDateTime } from "@/BaseModule/Utils/helpers";
import {
  Button,
  ButtonText,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from "@/components/ui";
import { Avatar } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { FlashList } from "@shopify/flash-list";
import { IndianRupeeIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getWalletTransactionsRequest } from "../Redux/Actions/MyprofileAction";

export const WalletScreen = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [filteredEventData, setFilteredEventData] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWalletTransactionsRequest());
  }, [dispatch]);

  const walletTransactionData = useSelector((state: any) =>
    walletTransactionsSelector(state)
  );

  useEffect(() => {
    if (walletTransactionData?.isSuccess) {
      setFilteredEventData(walletTransactionData?.data);
    }
  }, [walletTransactionData]);

  const walletBalanceState = useSelector((state: any) =>
    getBalanceSelector(state)
  );

  useEffect(() => {
    if (walletBalanceState?.isSuccess) {
      setAmount(walletBalanceState?.data);
    }
  }, [walletBalanceState]);

  const renderTransactionItem = ({ item }: { item: any }) => (
    <HStack space="2xl" className="justify-between items-center w-full py-3">
      <HStack className="items-center" space="md">
        <Avatar size="md" className="bg-[#e9e6fa]">
          <Icon as={IndianRupeeIcon} size="lg" className="color-[#6a1a57]" />
        </Avatar>
        <VStack>
          <Heading size="lg">{item?.description}</Heading>
          <Text size="md" className="text-[#848484] file:font-normal">
            {getFormatedDateTime(item?.purchased_at)}
          </Text>
        </VStack>
      </HStack>
      <Text className="color-[#6a1a57]">{item?.amount}</Text>
    </HStack>
  );

  return (
    <SafeAreaView className="w-full h-full">
      <VStack className="w-full h-full flex-1 bg-white px-8">
        {/* Wallet Header */}
        <Box className="w-full h-[194px] rounded-[20px] bg-[#62236b] justify-between items-center p-6 mt-6">
          <Text className="text-white text-lg font-medium">
            Available balance
          </Text>

          <Heading size="3xl" className="text-white font-semibold py-3">
            {walletBalanceState?.isLoading ? (
              <ActivityIndicator color={"white"} />
            ) : (
              `₹ ${amount}`
            )}
          </Heading>
          <Divider className="bg-white mt-4" />
          <Text className="text-center text-white text-sm font-normal pt-1 w-3/4">
            Wallet balance can be used only for in-app purchases
          </Text>
        </Box>

        {/* Transactions List */}
        <VStack className="self-start flex-1 mt-6 w-full">
          <Heading size="xl" className="font-semibold text-black mb-4">
            Previous transactions
          </Heading>
          <FlashList
            data={filteredEventData}
            renderItem={renderTransactionItem}
            keyExtractor={(item, index) => `transaction-${index}`}
            estimatedItemSize={80} // Adjust based on your item height
            ItemSeparatorComponent={() => <Divider className="my-1" />}
            showsVerticalScrollIndicator={false}
          />
        </VStack>

        {/* Add Button */}
        <VStack className="pb-4 bg-white">
          <Button
            onPress={() => handleNavigation("AddBalanceScreen")}
            size="xl"
            variant="solid"
            action="primary"
            className="w-full"
          >
            <ButtonText className="font-medium" children={"Add"} />
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};
