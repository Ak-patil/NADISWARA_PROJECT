import { calculateAge } from "@/BaseModule/Utils/helpers";
import {
  Card,
  HStack,
  Heading,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from "@/components/ui";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { FlashList } from "@shopify/flash-list";
import { ChevronRightIcon, SearchIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { patientHistoryRequest } from "../Redux/Actions/HomeAction";
import { patientListSelector } from "../Redux/Reducer/HomeSelector";

type Patient = {
  first_name: string;
  last_name: string;
  relation: string;
  age: number;
  gender: string;
  family_member: number;
  avatar: string;
  dob: string;
};

const AllPatients = () => {
  const [filteredEventData, setFilteredEventData] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(patientListRequest());
  // }, [dispatch]);

  const patientListData = useSelector((state) => patientListSelector(state));
  console.log("patientListData", patientListData);

  useEffect(() => {
    if (patientListData?.isSuccess) {
      setFilteredEventData(patientListData?.data?.data);
    }
  }, [patientListData]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEventData(patientListData?.data?.data || []);
    } else {
      const filtered = patientListData?.data?.data.filter((patient: Patient) =>
        patient.first_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEventData(filtered);
    }
  }, [searchQuery, patientListData]);

  const renderEmptyComponent = () => (
    <VStack className="items-center justify-center mt-8">
      <Text size="lg" className="text-text-text2 font-ClashMedium">
        No patients available. Please add a new patient.
      </Text>
    </VStack>
  );

  const handlePatientDetails = (item: Patient) => {
    dispatch(patientHistoryRequest({ patient_id: 13 }));
    handleNavigation("PatientHistory");
  };

  const renderPatientItem = ({
    item,
    index,
  }: {
    item: Patient;
    index: number;
  }) => {
    const fullName = item.first_name + " " + item.last_name;
    return (
      <React.Fragment key={index}>
        <Pressable
          onPress={() => handlePatientDetails(item)}
          className="w-full flex-1"
        >
          <HStack
            className="justify-between items-center w-full flex-1 py-4"
            space="2xl"
          >
            <HStack space="xl">
              <Avatar size="md" className="bg-[#e6e6fa]">
                <AvatarFallbackText
                  size="md"
                  className="text-primary-prime font-ClashMedium"
                >
                  {fullName}
                </AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: item.avatar,
                  }}
                />
              </Avatar>
              <VStack>
                <Heading
                  size="lg"
                  className="font-ClashMedium color-primary-prime"
                >
                  {fullName}
                </Heading>
                <Text size="lg" className="text-text-text2 font-ClashMedium">
                  {calculateAge(item.dob)}
                  {", "}
                  {item.gender}
                </Text>
              </VStack>
            </HStack>

            <Icon as={ChevronRightIcon} className="color-primary-prime" />
          </HStack>
        </Pressable>
        {patientListData.length !== index && (
          <Divider className="h-1 bg-[#f7f7f7] w-full" />
        )}
      </React.Fragment>
    );
  };

  return (
    <VStack space="xl" className="w-full flex-1 bg-white px-[20px] pt-24">
      <Input size="xl" className="bg-white rounded-xl mb-4">
        <InputField
          className="font-ClashMedium"
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <InputSlot className="pr-4">
          <InputIcon as={SearchIcon} className="color-primary-prime" />
        </InputSlot>
      </Input>

      <HStack className="justify-between mb-4 items-baseline">
        <Text size="xl" className="font-ClashMedium text-text-text1">
          All patients
        </Text>
        <Pressable onPress={() => handleNavigation("AddPatient")}>
          <Text size="xl" className="font-ClashMedium color-primary-prime">
            + Add New
          </Text>
        </Pressable>
      </HStack>
      <Card
        size="lg"
        variant="elevated"
        className="shadow-lg flex-1 mb-8 h-5/6"
      >
        {patientListData?.isLoading ? (
          <VStack className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#562672" />
            <Text
              size="md"
              className="text-gray-600 mt-4 self-center font-ClashMedium"
            >
              Loading patients...
            </Text>
          </VStack>
        ) : (
          <FlashList
            data={filteredEventData}
            renderItem={renderPatientItem}
            estimatedItemSize={80}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={renderEmptyComponent}
          />
        )}
      </Card>
    </VStack>
  );
};

export default AllPatients;
