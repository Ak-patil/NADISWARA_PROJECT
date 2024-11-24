import { getBalanceSelector } from "@/AppModules/MyProfile/Redux/Reducer/MyprofileSelector";
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
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { IndianRupeeIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { useSelector } from "react-redux";

const transactions = [
  {
    name: "John Doe",
    date: "10 oct 2024",
    relation: "Father",
    age: -100,
    gender: "Male",
    numberOfRecords: 12,
    avatar: "https://example.com/avatars/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    date: "05 oct 2024",
    relation: "Mother",
    age: -200,
    gender: "Female",
    numberOfRecords: 18,
    avatar: "https://example.com/avatars/jane_smith.jpg",
  },
  {
    name: "Emily Johnson",
    date: "10 nov 2024",
    relation: "Daughter",
    age: 200,
    gender: "Female",
    numberOfRecords: 5,
    avatar: "https://example.com/avatars/emily_johnson.jpg",
  },
  {
    name: "Michael Brown",
    date: "10 dec 2024",
    relation: "Son",
    age: 300,
    gender: "Male",
    numberOfRecords: 7,
    avatar: "https://example.com/avatars/michael_brown.jpg",
  },
];

export const WalletScreen = () => {
  const [amount, setAmount] = useState();

  const walletBalanceState = useSelector((state) => getBalanceSelector(state));

  useEffect(() => {
    if (walletBalanceState?.isSuccess) {
      setAmount(walletBalanceState?.data);
    }
  }, [walletBalanceState]);

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
        <ScrollView className="flex-1 mt-6">
          <VStack className="self-start">
            <Heading size="xl" className="font-semibold text-black">
              Previous transactions
            </Heading>
            <VStack className="py-2 rounded-xl justify-between items-center">
              {transactions.map((item, index) => (
                <React.Fragment key={index}>
                  <HStack
                    space="2xl"
                    className="justify-between items-center w-full py-3"
                  >
                    <HStack className="items-center" space="md">
                      <Avatar
                        size="md"
                        className={cn(
                          { "bg-[#fae6e6]": item.age > 0 },
                          { "bg-[#e9e6fa]": item.age < 0 }
                        )}
                      >
                        <Icon
                          as={IndianRupeeIcon}
                          size="lg"
                          className={cn(
                            { "color-[#d32121]": item.age > 0 },
                            { "color-[#6a1a57]": item.age < 0 }
                          )}
                        />
                      </Avatar>
                      <VStack>
                        <Heading size="lg">{item.name}</Heading>
                        <Text
                          size="md"
                          className="text-[#848484] file:font-normal"
                        >
                          {item.date}
                        </Text>
                      </VStack>
                    </HStack>
                    <Text
                      className={cn(
                        { "color-[#d32121]": item.age > 0 },
                        { "color-[#6a1a57]": item.age < 0 }
                      )}
                    >
                      {item.age}
                    </Text>
                  </HStack>
                  {transactions.length - 1 !== index && (
                    <Divider className="my-1" />
                  )}
                </React.Fragment>
              ))}
            </VStack>
          </VStack>
        </ScrollView>

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
