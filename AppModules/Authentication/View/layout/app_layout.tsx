import { Heading, Image, Text, VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";

type AuthLayoutProps = {
  title: string;
  content: string;
  children: React.ReactNode;
};

export const AppLayout = ({ title, content, children }: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <VStack className="flex-1 bg-white justify-between items-center px-8">
        <Image
          className="w-2/3 h-52 justify-center my-4"
          source={require("../../../../assets/Otp_screen.png")}
          alt="logo"
        />
        <VStack className="items-center py-8">
          <Heading className="text-[#0f0f0f] font-medium" size="xl">
            {title}
          </Heading>
          <Text size="md" className="text-center text-[#848484]  font-normal">
            {content}
          </Text>
        </VStack>
        {children}
      </VStack>
    </SafeAreaView>
  );
};
