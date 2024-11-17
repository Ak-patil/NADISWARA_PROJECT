import { Heading, Image, Text, VStack } from "@/components/ui";
import { Pressable } from "@/components/ui/pressable";
import { handleNavigation } from "../../../nadiswaraPro/Navigation/NaviagationHelper";

const DeviceConnection = () => {
  return (
    <VStack className="w-full flex-1 bg-white px-[20px] pt-8 justify-center items-center">
      <Image
        className="w-3/4 h-64"
        source={require("../../../assets/device_connection.png")}
        alt="device"
        resizeMode="contain"
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
