import {
  Button,
  ButtonText,
  HStack,
  Heading,
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
import { FlashList } from "@shopify/flash-list";
import { SearchIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { patientListRequest } from "../Redux/Actions/HomeAction";
import { patientListSelector } from "../Redux/Reducer/HomeSelector";

type Patient = {
  name: string;
  relation: string;
  age: number;
  gender: string;
  family_member: number;
  avatar: string;
};

const renderPatientItem = ({ item }: { item: Patient }) => (
  <HStack space="lg" className="w-full  py-4">
    <Avatar size="md" className="bg-[#e6e6fa]">
      <AvatarFallbackText className="text-black">
        {item.name}
      </AvatarFallbackText>
      <AvatarImage
        source={{
          uri: item.avatar,
        }}
      />
    </Avatar>

    <VStack>
      <Heading size="lg">{item.name}</Heading>
      <Text size="md" className="text-[#848484] font-normal">
        {item.age}, {item.gender}
      </Text>
      <Pressable>
        <Text size="md" className="font-medium text-primary-prime underline">
          {item.family_member} Record{item.family_member > 1 ? "s" : ""}
        </Text>
      </Pressable>
    </VStack>
  </HStack>
);

const ManagePatient = ({ navigation }) => {
  const [filteredEventData, setFilteredEventData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(patientListRequest());
  }, [dispatch]);

  const patientListData = useSelector((state) => patientListSelector(state));
  console.log("patientListData", patientListData);

  useEffect(() => {
    if (patientListData?.isSuccess) {
      setFilteredEventData(patientListData?.data?.data);
    }
  }, [patientListData]);

  const renderEmptyComponent = () => (
    <VStack className="items-center justify-center mt-8">
      <Text size="lg" className="text-[#848484] font-medium">
        No patients available. Please add a new patient.
      </Text>
    </VStack>
  );

  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8">
      {/* Header */}
      <Input size="xl" className="bg-white rounded-xl mb-4">
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder="Search..." />
      </Input>

      <HStack className="justify-between mb-4 items-baseline">
        <Text size="xl" className="font-bold">
          All Patients
        </Text>
        <Button
          size="lg"
          variant="link"
          action="primary"
          className="justify-end"
          onPress={() => navigation.navigate("AddPatient")}
        >
          <ButtonText size="xl" className="font-bold color-primary-prime">
            + Add New
          </ButtonText>
        </Button>
      </HStack>

      {/* FlashList */}

      {patientListData?.isLoading ? (
        <VStack className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#562672" />
          <Text size="md" className="text-gray-600 mt-4">
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
          ItemSeparatorComponent={() => <Divider className="bg-[##ededed]" />}
          ListEmptyComponent={renderEmptyComponent}
        />
      )}
    </VStack>
  );
};

export default ManagePatient;