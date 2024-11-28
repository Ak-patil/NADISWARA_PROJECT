import LottieAnimation from "@/AppModules/Authentication/Utils/lottie";
import { Button, ButtonText, Heading, Text, VStack } from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";

const AnalysePulse = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      <LottieAnimation
        animationSource={require("../../../assets/lottie/pulse.json")}
        width={300}
        height={300}
        containerStyle={{ backgroundColor: "#ffffff" }}
      />
      <Heading className="text-xl font-ClashMedium pt-4">
        Analysing your pulse...
      </Heading>
      <Pressable>
        <Text className="text-center text-text-text2 text-base font-ClashRegular">
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
          <ButtonText className="font-ClashMedium" children={"Analyse"} />
        </Button>
      </VStack>
    </VStack>
  );
};

export default AnalysePulse;
