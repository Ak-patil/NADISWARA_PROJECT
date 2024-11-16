import { HStack, Heading, Text, VStack } from "@/components/ui";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { FlashList } from "@shopify/flash-list";

const patients = [
  {
    name: "John Doe",
    relation: "Father",
    age: 58,
    gender: "Male",
    numberOfRecords: 12,
    avatar: "https://example.com/avatars/john_doe.jpg",
  },
  {
    name: "Jane Smith",
    relation: "Mother",
    age: 52,
    gender: "Female",
    numberOfRecords: 18,
    avatar: "https://example.com/avatars/jane_smith.jpg",
  },
  {
    name: "Emily Johnson",
    relation: "Daughter",
    age: 25,
    gender: "Female",
    numberOfRecords: 5,
    avatar: "https://example.com/avatars/emily_johnson.jpg",
  },
  {
    name: "Michael Brown",
    relation: "Son",
    age: 28,
    gender: "Male",
    numberOfRecords: 7,
    avatar: "https://example.com/avatars/michael_brown.jpg",
  },
  {
    name: "Sarah Davis",
    relation: "Sister",
    age: 35,
    gender: "Female",
    numberOfRecords: 9,
    avatar: "https://example.com/avatars/sarah_davis.jpg",
  },
  {
    name: "William Garcia",
    relation: "Brother",
    age: 42,
    gender: "Male",
    numberOfRecords: 11,
    avatar: "https://example.com/avatars/william_garcia.jpg",
  },
  {
    name: "Olivia Martinez",
    relation: "Wife",
    age: 34,
    gender: "Female",
    numberOfRecords: 15,
    avatar: "https://example.com/avatars/olivia_martinez.jpg",
  },
  {
    name: "James Wilson",
    relation: "Husband",
    age: 40,
    gender: "Male",
    numberOfRecords: 13,
    avatar: "https://example.com/avatars/james_wilson.jpg",
  },
  {
    name: "Sophia Taylor",
    relation: "Daughter",
    age: 22,
    gender: "Female",
    numberOfRecords: 4,
    avatar: "https://example.com/avatars/sophia_taylor.jpg",
  },
  {
    name: "Daniel Anderson",
    relation: "Uncle",
    age: 50,
    gender: "Male",
    numberOfRecords: 8,
    avatar: "https://example.com/avatars/daniel_anderson.jpg",
  },
];

const renderPatientItem = ({ item }: { item: (typeof patients)[0] }) => (
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
          {item.numberOfRecords} Record{item.numberOfRecords > 1 ? "s" : ""}
        </Text>
      </Pressable>
    </VStack>
  </HStack>
);

const ManagePatient = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8">
      {/* Header */}
      <HStack className="justify-between mb-4 items-baseline">
        <Text size="xl" className="font-bold">
          All Patients
        </Text>
        <Text size="xl" className="font-bold color-primary-prime">
          + Add New
        </Text>
      </HStack>

      {/* FlashList */}
      <FlashList
        data={patients}
        renderItem={renderPatientItem}
        estimatedItemSize={80}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <Divider className="my-  bg-[##ededed]" />
        )}
      />
    </VStack>
  );
};

export default ManagePatient;
