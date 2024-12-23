import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { verifyOtpEmailRequest } from "../../Redux/Actions/AuthAction";
import { verifyEmailStateSelector } from "../../Redux/Reducer/AuthSelector";
import { AppLayout } from "../layout/app_layout";

const verifyOtpEmailSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
});

type verifyOtpEmailSchemaType = z.infer<typeof verifyOtpEmailSchema>;

const VerifyOtpEmailScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<verifyOtpEmailSchemaType>({
    resolver: zodResolver(verifyOtpEmailSchema),
  });

  const dispatch = useDispatch();

  const verifyEmailState = useSelector((state) =>
    verifyEmailStateSelector(state)
  );

  const [validated, setValidated] = useState({
    emailValid: true,
  });

  const onSubmit = (_data: verifyOtpEmailSchemaType) => {
    if (_data) {
      dispatch(
        verifyOtpEmailRequest({
          email_or_phone: _data.email,
        })
      );
    } else {
      reset();
    }
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="w-full flex-1 bg-white justify-between" space="4xl">
      <VStack space="xl" className="w-full">
        <FormControl
          isInvalid={!!errors?.email || !validated.emailValid}
          className="w-full"
        >
          <FormControlLabel>
            <FormControlLabelText size="lg" className="font-ClashMedium">
              Email or phone number
            </FormControlLabelText>
          </FormControlLabel>
          <Controller
            defaultValue=""
            name="email"
            control={control}
            rules={{
              validate: async (value) => {
                try {
                  await verifyOtpEmailSchema.parseAsync({ email: value });
                  return true;
                } catch (error: any) {
                  return error.message;
                }
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input size="lg">
                <InputField
                  className="text-md font-ClashRegular"
                  placeholder="Enter email or phone number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  onSubmitEditing={handleKeyPress}
                  returnKeyType="done"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorText>
              {errors?.email?.message ||
                (!validated.emailValid && "Email ID not found")}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
      </VStack>
      <VStack>
        <Button
          size="xl"
          variant="solid"
          action="primary"
          className="w-full mb-8"
          onPress={handleSubmit(onSubmit)}
        >
          {verifyEmailState?.isLoading ? (
            <Spinner size={"small"} className="color-white" />
          ) : (
            <ButtonText className="font-ClashMedium">Continue</ButtonText>
          )}
        </Button>
      </VStack>
    </VStack>
  );
};

export const VerifyOtpEmail = () => {
  return (
    <AppLayout
      title="Enter email or phone number"
      content="Enter your email address or phone number to receive an OTP to change your password."
    >
      <VerifyOtpEmailScreen />
    </AppLayout>
  );
};
