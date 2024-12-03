import { getBalanceRequest } from "@/AppModules/MyProfile/Redux/Actions/MyprofileAction";
import { HStack, Heading, Icon, Image, Text, VStack } from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { Bell } from "lucide-react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { patientListRequest } from "../Redux/Actions/HomeAction";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  dispatch(getBalanceRequest());
  dispatch(patientListRequest());

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <VStack className="w-full flex-1 bg-white top-20">
        <VStack className="basis-1/5">
          <HStack className="justify-between items-center px-6">
            <Image
              source={require("./.././../../assets/logo_home.png")}
              alt="Logo"
              className="w-36 h-16"
              resizeMode="contain" // Ensures the image is scaled correctly
            />
            <Icon as={Bell} className="color-primary-prime  h-14" size="xl" />
          </HStack>
          <VStack className="px-6 top-[3]">
            <Heading size="xl" className="text-black font-ClashMedium">
              Analyse Your Health
            </Heading>
            <Text className="text-text-text2 font-ClashRegular" size="md">
              Understand your health better with simple steps.
            </Text>
          </VStack>
        </VStack>
        <VStack className="basis-4/5">
          <Pressable onPress={() => navigation.navigate("AddPatient")}>
            <HStack className="w-11/12 h-[180px] bg-primary-prime rounded-tr-[20px] rounded-br-[20px] justify-between">
              <VStack
                space="lg"
                className="items-start justify-center pl-4"
                style={{ width: "60%" }}
              >
                <Text size="lg" className="text-white font-ClashMedium">
                  Add new patient
                </Text>
                <Text
                  size="md"
                  className="text-white text-md font-ClashRegular"
                >
                  Add a new patient with just a few simple details.
                </Text>
                <Image
                  source={require("./.././../../assets/Arrow_img.png")}
                  alt="Logo"
                  className="h-10"
                  resizeMode="contain" // Ensures the image is scaled correctly
                />
              </VStack>
              <VStack className="w-1/3 bg-white rounded-xl justify-center items-center my-4 right-[12px]">
                <Image
                  source={require("./.././../../assets/patient_add.png")}
                  alt="add_patient"
                  style={{ width: 100, height: 100 }} // Set a specific height and width for the image
                  resizeMode="contain" // Ensures the image is scaled correctly
                />
              </VStack>
            </HStack>
          </Pressable>
          {/* <Pressable>
            <HStack className="w-11/12 h-[180px] self-end top-8 bg-background-secondary rounded-tl-[20px] rounded-bl-[20px] shadow justify-between">
              <VStack className="w-1/3 bg-white rounded-xl justify-center items-center my-4 left-[12px]">
                <Image
                  source={require("./.././../../assets/home_1.png")}
                  alt="Home Image"
                  style={{ width: 100, height: 100 }} // Set a specific height and width for the image
                  resizeMode="contain" // Ensures the image is scaled correctly
                />
              </VStack>
              <VStack
                space="lg"
                className="items-start justify-center pl-4"
                style={{ width: "60%" }}
              >
                <Text size="lg" className="text-white font-ClashMedium">
                  Go sensor free
                </Text>
                <Text className="text-white text-md font-ClashRegular">
                  Analyze your health with a tongue image.
                </Text>
                <Image
                  source={require("./.././../../assets/Arrow_img.png")}
                  alt="Logo"
                  className="h-10"
                  resizeMode="contain" // Ensures the image is scaled correctly
                />
              </VStack>
            </HStack>
          </Pressable> */}
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
