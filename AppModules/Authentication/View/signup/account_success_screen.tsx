import { Heading, Image, VStack } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";

// Define the props for AccountSuccessComponent (none in this case)
const AccountSuccessComponent: React.FC = () => {
  return (
    <VStack className="w-full flex-1 bg-white">
      {/* Main content */}
      <VStack className="flex-grow justify-center items-center">
        <Image
          className="w-3/4 h-64"
          source={require("../../../../assets/success.png")}
          alt="device"
          resizeMode="contain"
        />
        <Heading className="text-xl font-medium pt-4 text-center">
          Woohoo! Your account has been created successfully!
        </Heading>
      </VStack>

      {/* Button at the bottom */}
      <VStack className="p-4 mb-4">
        <Button
          size="xl"
          variant="solid"
          action="primary"
          className="w-full"
          onPress={() => handleNavigation("signin")}
        >
          <ButtonText className="font-medium">Continue</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const AccountSuccess: React.FC = () => {
  return <AccountSuccessComponent />;
};
