import {
  Button,
  ButtonSpinner,
  ButtonText,
  Heading,
  Image,
  Text,
  VStack,
} from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";

const AnalysePulse = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      {/* <Heading className="text-xl font-medium">Analyse your pulse</Heading>

      <Text className="text-base color-[#848484] font-normal">
        Check your pulse for instant health insights
      </Text> */}

      <Image
        className="w-1/2 h-28"
        source={require("../../../assets/analyse.png")}
        alt="device"
        resizeMode="contain"
      />
      <Heading className="text-xl font-medium pt-4">
        Analysing your pulse...
      </Heading>
      <Pressable>
        <Text className="text-center text-[#848484] text-base font-normal">
          This will take a few seconds, Please stay calm
        </Text>
      </Pressable>

      <VStack
        className="px-[20px] pb-5 bg-white"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Button
          size="xl"
          variant="solid"
          action="primary"
          className="w-full"
          onPress={() => handleNavigation("FetchReport")}
        >
          <ButtonSpinner color={"#FFFFFF"} />
          <ButtonText className="font-medium" children={"Analyse"} />
        </Button>
      </VStack>
    </VStack>
  );
};

export default AnalysePulse;