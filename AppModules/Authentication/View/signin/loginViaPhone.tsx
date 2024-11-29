import { HStack } from "@/components/ui";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { loginViaEmailStateSelector } from "../../Redux/Reducer/AuthSelector";
import { AuthLayout } from "../layout";
import { GoogleIcon } from "./assets/icons/google";

const loginOtpSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[6-9]\d{9}$/.test(value),
      {
        message: "Enter a valid email or phone number",
      }
    ),
});

type LoginOTPSchemaType = z.infer<typeof loginOtpSchema>;

export const LoginViaPhoneComponent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginOTPSchemaType>({
    resolver: zodResolver(loginOtpSchema),
  });
  const dispatch = useDispatch();

  const loginViaEmailState = useSelector((state) =>
    loginViaEmailStateSelector(state)
  );

  const [validated, setValidated] = useState({
    emailValid: true,
  });

  const onSubmit = (data: LoginOTPSchemaType) => {
    if (data) {
      console.log("data", data);
      //   dispatch(
      //     loginViaEmailRequest({
      //       phone: data.phoneNumber,
      //     })
      //   );
    } else {
      reset();
      setValidated({ emailValid: false });
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  // const router = useRouter();
  return (
    <>
      <VStack className="items-center" space="xs">
        <Heading className="text-text-text1 font-ClashMedium" size="xl">
          Login via OTP
        </Heading>
        <Text
          size="md"
          className="text-center text-text-text2 font-ClashRegular"
        >
          Login to your existing account using OTP
        </Text>
      </VStack>
      <VStack className="w-full" space="xl">
        <VStack space="xl" className="w-full py-8">
          <FormControl isInvalid={!!errors.phoneNumber}>
            <FormControlLabel className="mb-2">
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Phone number
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginOtpSchema.parseAsync({ phoneNumber: value });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <HStack className="gap-1">
                  <Select className="w-[24%]">
                    <SelectTrigger variant="outline" size="lg">
                      <SelectInput
                        placeholder="+91"
                        className="font-ClashRegular"
                      />
                      <SelectIcon className="mr-1" as={ChevronDownIcon} />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="+91" value="+91" />
                        <SelectItem label="+1" value="+1" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                  <Input size="lg" className="flex-1">
                    <InputField
                      className="text-md font-ClashRegular"
                      placeholder="999*******"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="number-pad"
                      onBlur={onBlur}
                      onSubmitEditing={handleKeyPress}
                      returnKeyType="done"
                    />
                  </Input>
                </HStack>
              )}
            />
            {errors.phoneNumber && (
              <FormControlLabelText className="text-red-400 font-ClashRegular">
                {errors.phoneNumber.message}
              </FormControlLabelText>
            )}
          </FormControl>
        </VStack>
        <VStack className="w-full my-2 " space="xl">
          <Button
            size="xl"
            variant="solid"
            action="primary"
            className="w-full"
            onPress={handleSubmit(onSubmit)}
          >
            {loginViaEmailState?.isLoading ? (
              <Spinner size="small" className="color-white" />
            ) : (
              <ButtonText
                size="lg"
                className="font-ClashMedium"
                children="Send OTP"
              />
            )}
          </Button>
          <Button
            size="lg"
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => handleNavigation("signin")}
          >
            <ButtonText className="font-ClashMedium color-primary-prime">
              Login with password
            </ButtonText>
          </Button>
          <Button
            size="lg"
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => {}}
          >
            <ButtonIcon as={GoogleIcon} />
            <ButtonText size="lg" className="font-ClashMedium">
              Continue with Google
            </ButtonText>
          </Button>
        </VStack>
        <HStack className="justify-center items-center" space="sm">
          <Text size="lg">Don't have an account?</Text>
          <Button
            size="lg"
            variant="link"
            action="primary"
            className="justify-end"
            onPress={() => navigation.navigate("signup")}
          >
            <ButtonText className="font-ClashMedium text-lg text-primary-prime">
              Sign up
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export const LoginViaPhone = ({ navigation }) => {
  return (
    <AuthLayout>
      <LoginViaPhoneComponent navigation={navigation} />
    </AuthLayout>
  );
};
