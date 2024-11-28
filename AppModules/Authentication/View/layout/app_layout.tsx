import { Image, Text, VStack } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";

type AuthLayoutProps = {
  title: string;
  content: string;
  children: React.ReactNode;
};

export const AppLayout = ({ title, content, children }: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full bg-white">
      <VStack
        space="4xl"
        className="flex-1 bg-white justify-between items-center px-8"
      >
        <Image
          className="w-5/6 h-40 justify-center top-8"
          source={require("../../../../assets/nadiswara_logo_2.png")}
          alt="logo"
          resizeMode="contain"
        />
        <VStack className="items-center py-8">
          <Text className="text-text-text1 font-ClashMedium" size="2xl">
            {title}
          </Text>
          <Text
            size="md"
            className="text-center text-text-text2  font-ClashRegular"
          >
            {content}
          </Text>
        </VStack>
        {children}
      </VStack>
    </SafeAreaView>
  );
};
