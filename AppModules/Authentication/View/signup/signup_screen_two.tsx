import { HStack, VStack } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TimerCount from "../../../../BaseModule/Components/TimerCount";
import { verifyOtpRequest } from "../../Redux/Actions/AuthAction";
import { verifyOtpStateSelector } from "../../Redux/Reducer/AuthSelector";
import { AppLayout } from "../layout/app_layout";

interface SignupScreenComponentProps {
  userEmail: string;
  isEmail: boolean;
}

const SignupScreenComponent: React.FC<SignupScreenComponentProps> = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<any>>(Array(6).fill(null));
  const [isOtpFilled, setIsOtpFilled] = useState<boolean>(false);

  const verifyOtpViaEmailState = useSelector((state) =>
    verifyOtpStateSelector(state)
  );

  const handleOtpChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    setIsOtpFilled(updatedOtp.every((val) => val !== ""));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else {
      inputRefs.current[index]?.blur();
    }
  };

  const handleResendClick = () => {
    setOtp(["", "", "", "", "", ""]);
    dispatch(verifyOtpRequest({ otp: otp.join("") }));
  };

  const onSubmit = () => {
    if (isOtpFilled) {
      dispatch(verifyOtpRequest({ otp: otp.join("") }));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1, width: "100%" }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack className="w-full flex-1 bg-white justify-between">
          <VStack space="xl" className="w-full">
            <FormControl isInvalid={!isOtpFilled}>
              <HStack className="justify-between items-center">
                {otp.map((value, index) => (
                  <Input
                    size="lg"
                    className="w-[46px] h-[46px] rounded-xl"
                    key={index}
                  >
                    <InputField
                      className="text-lg font-semibold self-center"
                      onChangeText={(text) => handleOtpChange(text, index)}
                      value={value}
                      maxLength={1}
                      keyboardType="numeric"
                      autoFocus={index === 0}
                      ref={(input) => (inputRefs.current[index] = input)}
                    />
                  </Input>
                ))}
              </HStack>
              <FormControlError>
                <FormControlErrorText className="font-ClashRegular">
                  {!isOtpFilled && "Please fill in all OTP fields"}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <HStack className="justify-end">
              <TimerCount handleResendClick={handleResendClick} />
            </HStack>
          </VStack>
          <VStack className="pt-4">
            <Button
              size="xl"
              variant="solid"
              action="primary"
              className="w-full mb-8"
              onPress={handleSubmit(onSubmit)}
            >
              {verifyOtpViaEmailState?.isLoading ? (
                <Spinner size="small" className="color-white" />
              ) : (
                <ButtonText
                  size="lg"
                  className="font-ClashMedium"
                  children={"Continue"}
                />
              )}
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

interface SignupScreenTwoProps {
  route: {
    params: {
      _parts: Array<[string, string]>;
    };
  };
}

export const SignupScreenTwo: React.FC<SignupScreenTwoProps> = ({ route }) => {
  const emailOrPhone =
    route.params._parts.find(([key]) => key === "email/phone_number")?.[1] ??
    "";
  return (
    <AppLayout
      title="Enter OTP"
      content={`A verification code has been sent to ${emailOrPhone}`}
    >
      <SignupScreenComponent userEmail={emailOrPhone} isEmail={true} />
    </AppLayout>
  );
};
