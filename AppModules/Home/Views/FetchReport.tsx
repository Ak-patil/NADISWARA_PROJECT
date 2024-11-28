import LottieAnimation from "@/AppModules/Authentication/Utils/lottie";
import { Button, ButtonText, Text, VStack } from "@/components/ui";
import { resetStack } from "@/nadiswaraPro/Navigation/NavigationService";

const FetchReport = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      <LottieAnimation
        animationSource={require("../../../assets/lottie/success.json")}
        width={300}
        height={300}
        containerStyle={{ backgroundColor: "#ffffff" }}
      />
      <Text size="2xl" className="font-ClashMedium text-text-text1">
        Report fetched successfully
      </Text>
      <Button
        size="lg"
        variant="link"
        action="primary"
        className="justify-end h-6"
        onPress={() => resetStack("appstack")}
      >
        <ButtonText
          size="lg"
          className="font-ClashMedium underline text-primary-prime group-hover/link:text-primary-600"
        >
          View Report
        </ButtonText>
      </Button>
    </VStack>
  );
};

export default FetchReport;
