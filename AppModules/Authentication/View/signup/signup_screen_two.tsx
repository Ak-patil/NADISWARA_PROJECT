import { Text } from "@/components/ui";
import { VStack } from "@/components/ui/vstack";
import { AppLayout } from "../layout/app_layout";

const SignupScreenComponent = () => {
  return (
    <VStack className="w-full flex-1 bg-white justify-between">
      <VStack space="xl" className="w-full">
        <Text>Hello SignupScreenComponent</Text>
      </VStack>
    </VStack>
  );
};

export const SignupScreenTwo = () => {
  return (
    <AppLayout
      title="Enter OTP"
      content="A verification code has been sent to anand@gmail.com"
    >
      <SignupScreenComponent />
    </AppLayout>
  );
};
