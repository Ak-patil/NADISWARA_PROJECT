import { Card, Image, LinearGradient } from "@/components/ui";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { ScrollView } from "@/components/ui/scroll-view";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <LinearGradient
          className="flex-1 justify-center items-center space-y-2"
          colors={["#572673", "#572673", "#FFFFFF", "#FFFFFF"]}
          locations={[0, 0.55, 0.55, 1]}
        >
          <Image
            className="w-1/2 h-52 justify-center"
            source={require("../../../../assets/OOHY_LOGO.png")}
            alt="logo"
          />
          <Card
            size="lg"
            variant="elevated"
            className="w-[360px] h-[520px] bg-white rounded-[20px] shadow"
          >
            {props.children}
          </Card>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};
