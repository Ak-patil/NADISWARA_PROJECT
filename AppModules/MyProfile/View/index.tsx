import { HStack, LinearGradient, Text, VStack } from "@/components/ui";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { Divider } from "@/components/ui/divider";
import { EditIcon, Icon, PhoneIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  KeyIcon,
  LogOut,
  MessageSquare,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react-native";
import React from "react";

interface AccountCardType {
  iconName: LucideIcon | typeof Icon;
  subText: string;
  subText2: string;
  navigation: string;
}

const accountData: AccountCardType[] = [
  {
    iconName: Wallet,
    subText: "Wallet",
    subText2: "Manage, add & more",
    navigation: "WalletScreen",
  },
  {
    iconName: MessageSquare,
    subText: "Help",
    subText2: "FAQs, get help & more",
    navigation: "HelpScreen",
  },
  {
    iconName: Settings,
    subText: "App settings",
    subText2: "Theme, notifications & More",
    navigation: "SettingsScreen",
  },
  {
    iconName: KeyIcon,
    subText: "Change password",
    subText2: "Change password",
    navigation: "ChangePasswordScreen",
  },
  {
    iconName: PhoneIcon,
    subText: "About Nadiswara",
    subText2: "About us, Terms & policies",
    navigation: "AboutScreen",
  },
];
const logout = async () => {
  await AsyncStorage.clear()
    .then(() => {
      handleNavigation("launchscreen");
    })
    .catch((e) => console.log(e, "error while logout"));
};

export const ProfileScreen = () => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          className="flex-1 items-center justify-center"
          colors={["#6A1B58", "#6A1B58", "#FFFFFF", "#FFFFFF"]}
          locations={[0, 0.55, 0.55, 1]}
        >
          <Center className="md:mt-14 mt-6 w-full md:px-10 md:pt-6 pb-4">
            <VStack space="lg" className="items-center">
              <Avatar size="2xl" className="bg-primary-600">
                <AvatarImage
                  alt="Profile Image"
                  source={require("../../../assets/icon.png")}
                />
              </Avatar>
              <VStack className="gap-1 w-full items-center">
                <Pressable>
                  <HStack space="sm" className="items-center">
                    <Text size="2xl" className="font-roboto text-white">
                      Alexander Leslie
                    </Text>
                    <Icon as={EditIcon} className="color-white w-5 h-5" />
                  </HStack>
                </Pressable>

                <Text className="font-roboto text-sm text-white">
                  anand@gmail.com
                </Text>
              </VStack>
            </VStack>
          </Center>
          <VStack className="w-5/6 h-4.5/5 bg-white rounded-[20px] shadow mt-4">
            {accountData.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Pressable
                    onPress={() => {
                      handleNavigation(item.navigation); // Handle the press action here
                    }}
                    className="w-full flex-1"
                  >
                    <HStack
                      className="items-stretch w-full flex-1 py-4 px-8"
                      space="2xl"
                    >
                      <Icon
                        as={item.iconName}
                        className="color-primary-prime w-7 h-7 mt-1"
                      />
                      <VStack>
                        <Text size="xl" className="font-ClashMedium">
                          {item.subText}
                        </Text>
                        <Text
                          size="md"
                          className="text-text-text2 font-ClashRegular"
                        >
                          {item.subText2}
                        </Text>
                      </VStack>
                    </HStack>
                  </Pressable>
                  {accountData.length - 1 !== index && (
                    <Divider className="h-1 bg-[#f7f7f7] w-full" />
                  )}
                </React.Fragment>
              );
            })}
          </VStack>
        </LinearGradient>
      </ScrollView>
      <Pressable
        onPress={() => logout()}
        className="absolute bottom-6 left-1/2 -translate-x-1/2  px-6 py-3"
      >
        <HStack space="md">
          <Icon as={LogOut} className="color-warning-warning w-7 h-7" />
          <Text size="lg" className="text-warning-warning font-ClashMedium">
            Logout
          </Text>
        </HStack>
      </Pressable>
    </SafeAreaView>
  );
};
