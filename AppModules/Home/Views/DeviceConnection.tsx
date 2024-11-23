import LottieAnimation from "@/AppModules/Authentication/Utils/lottie";
import { Heading, Text, VStack } from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { handleNavigation } from "../../../nadiswaraPro/Navigation/NaviagationHelper";

const DeviceConnection = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      <LottieAnimation
        animationSource={require("../../../assets/lottie/deviceConnection.json")}
        width={300}
        height={300}
        containerStyle={{ backgroundColor: "#ffffff" }}
      />
      <Heading className="text-xl font-medium pt-4">
        Connecting to sensor...
      </Heading>
      <Pressable onPress={() => handleNavigation("AnalysePulse")}>
        <Text className="text-base color-primary-prime font-normal">
          1 Device found
        </Text>
      </Pressable>
    </VStack>
  );
};

export default DeviceConnection;
