import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { verifyOtpEmailRequest } from "../../Redux/Actions/AuthAction";
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
            <FormControlLabelText size="lg">Email</FormControlLabelText>
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
                  className="text-md"
                  placeholder="Enter email"
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
          <ButtonText className="font-medium">Continue</ButtonText>
        </Button>
      </VStack>
    </VStack>
  );
};

export const VerifyOtpEmail = () => {
  return (
    <AppLayout
      title="Enter Email"
      content="Enter your email address to receive an OTP to reset your password."
    >
      <VerifyOtpEmailScreen />
    </AppLayout>
  );
};
