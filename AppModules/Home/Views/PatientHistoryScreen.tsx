import {
  DISPLAY_COMPLETE_MONTH_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
  getFormatedDateTime,
} from "@/BaseModule/Utils/helpers";
import {
  Button,
  ButtonText,
  HStack,
  Icon,
  LinearGradient,
  Text,
  VStack,
} from "@/components/ui";
import { Divider } from "@/components/ui/divider";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Spinner } from "@/components/ui/spinner";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { FlashList } from "@shopify/flash-list";
import { EditIcon, EllipsisVertical } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { patientHistorySelector } from "../Redux/Reducer/HomeSelector";

export const PatientHistoryScreen = () => {
  const [filteredEventData, setFilteredEventData] = useState<any[]>([]);

  const patientRecordsData = useSelector((state: any) =>
    patientHistorySelector(state)
  );

  useEffect(() => {
    setFilteredEventData(patientRecordsData?.data?.data);
  }, [patientRecordsData]);

  const renderTransactionItem = ({ item }: { item: any }) => {
    return (
      <HStack space="2xl" className="justify-between items-center w-full py-3">
        <HStack className="items-center" space="md">
          <VStack>
            <Text size="lg" className="font-ClashMedium text-text-text1">
              {getFormatedDateTime(
                item?.datetime,
                DISPLAY_COMPLETE_MONTH_DATE_FORMAT
              )}
            </Text>

            <Text size="md" className="text-text-text2 file:font-ClashRegular">
              {getFormatedDateTime(item?.datetime, DISPLAY_TIME_FORMAT)}
            </Text>
            <Button
              size="md"
              variant="link"
              action="primary"
              className="justify-start"
            >
              <ButtonText className="font-ClashMedium underline  text-md text-primary-prime">
                {item?.total_reports} Records
              </ButtonText>
            </Button>
          </VStack>
        </HStack>

        <Menu
          offset={5}
          placement="bottom"
          trigger={({ ...triggerProps }) => {
            return (
              <Pressable {...triggerProps}>
                <Icon
                  as={EllipsisVertical}
                  className="color-text-text1 w-7 h-7"
                />
              </Pressable>
            );
          }}
          className="w-[70%]"
        >
          <MenuItem
            key="Membership"
            textValue="Membership"
            className="p-2 justify-between w-1/2"
          >
            <MenuItemLabel
              size="md"
              className="font-ClashMedium text-primary-prime"
            >
              Add comment
            </MenuItemLabel>
          </MenuItem>
          <MenuItem key="Orders" textValue="Orders" className="p-2 w-1/2">
            <MenuItemLabel
              size="md"
              className="font-ClashMedium text-primary-prime"
            >
              Add suggestion
            </MenuItemLabel>
          </MenuItem>
        </Menu>
      </HStack>
    );
  };
  return (
    <SafeAreaView className="w-full h-full">
      <LinearGradient
        className="flex-1"
        colors={["#6A1B58", "#6A1B58", "#FFFFFF", "#FFFFFF"]}
        locations={[0, 0.25, 0.25, 1]}
      >
        <VStack className="w-[100px] h-[100px] self-center bg-icon-iconColor rounded-full  mt-40"></VStack>
        <VStack className="gap-1 w-full items-center pt-1">
          <Pressable>
            <HStack space="sm" className="items-center justify-center">
              <Text size="xl" className="font-ClashMedium text-text-text1">
                Alexander Leslie
              </Text>
              <Icon as={EditIcon} className="color-text-text1 w-5 h-5" />
            </HStack>
          </Pressable>

          <Text className="font-ClashRegular text-md text-text-text2">
            anand@gmail.com
          </Text>
        </VStack>
        <VStack className="w-full flex-1 mt-3 px-6">
          {patientRecordsData?.isLoading ? (
            <VStack className="justify-center flex-1">
              <Spinner size="large" className="color-primary-prime" />
            </VStack>
          ) : (
            <FlashList
              data={filteredEventData}
              renderItem={renderTransactionItem}
              keyExtractor={(item, index) => `history-${index}`}
              estimatedItemSize={80} // Adjust based on your item height
              ItemSeparatorComponent={() => <Divider className="my-1" />}
              showsVerticalScrollIndicator={false}
            />
          )}
        </VStack>
        <VStack className="pb-4 bg-white mt-2 flex-grow-0 px-6">
          <Button
            onPress={() => handleNavigation("FormOne")}
            size="xl"
            variant="solid"
            action="primary"
            className="w-full"
          >
            <ButtonText
              size="lg"
              className="font-ClashMedium"
              children="Re-take"
            />
          </Button>
        </VStack>
      </LinearGradient>
    </SafeAreaView>
  );
};
