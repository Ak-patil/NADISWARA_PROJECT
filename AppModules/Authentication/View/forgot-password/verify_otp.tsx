import { HStack, VStack } from "@/components/ui";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { z } from "zod";
import TimerCount from "../../../../BaseModule/Components/TimerCount";
import {
  resetPasswordRequest,
  verifyOtpRequest,
} from "../../Redux/Actions/AuthAction";
import { AppLayout } from "../layout/app_layout";

const verifyOtpSchema = z.object({
  password: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
  confirmpassword: z
    .string()
    .min(6, "Must be at least 8 characters in length")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    ),
});

type verifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;

const VerifyOtpScreen = ({ userEmail, isEmail }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<verifyOtpSchemaType>({
    resolver: zodResolver(verifyOtpSchema),
  });
  const toast = useToast();
  const dispatch = useDispatch();
  const [otp2, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(Array(6).fill(null));
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const updatedOtp = [...otp2];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    const isFilled = updatedOtp.every((val) => val !== "");
    setIsOtpFilled(isFilled);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1].focus();
    } else {
      inputRefs.current[index].blur();
    }
  };

  const handleResendClick = () => {
    setOtp(["", "", "", "", "", ""]);
    dispatch(verifyOtpRequest({ otp: otp2.join("") }));
  };

  const onSubmit = (_data: verifyOtpSchemaType) => {
    console.log("isOtpFilled", isOtpFilled);
    if (!isOtpFilled) {
      return;
    }
    dispatch(
      resetPasswordRequest({
        otp: otp2.join(""),
        password1: _data.password,
        password2: _data.confirmpassword,
      })
    );
    // Handle form submission logic here
  };

  const handleState = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleConfirmPwState = () => {
    setShowConfirmPassword((prevState) => !prevState);
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
                {otp2.map((value, index) => (
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
                <FormControlErrorText>
                  {!isOtpFilled && "Please fill in all OTP fields"}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <HStack className="justify-end">
              <TimerCount handleResendClick={handleResendClick} />
            </HStack>

            <FormControl isInvalid={!!errors.password}>
              <FormControlLabel>
                <FormControlLabelText size="lg">Password</FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input size="lg">
                    <InputField
                      className="text-md"
                      placeholder="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputSlot onPress={handleState} className="pr-3">
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.password?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.confirmpassword}>
              <FormControlLabel>
                <FormControlLabelText size="lg">
                  Confirm Password
                </FormControlLabelText>
              </FormControlLabel>
              <Controller
                name="confirmpassword"
                control={control}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input size="lg">
                    <InputField
                      className="text-md"
                      placeholder="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      type={showConfirmPassword ? "text" : "password"}
                    />
                    <InputSlot onPress={handleConfirmPwState} className="pr-3">
                      <InputIcon
                        as={showConfirmPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                )}
              />
              <FormControlError>
                <FormControlErrorText>
                  {errors.confirmpassword?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
          </VStack>

          <VStack className="pt-4">
            <Button
              size="xl"
              variant="solid"
              action="primary"
              className="w-full mb-8 "
              onPress={handleSubmit(onSubmit)}
            >
              <ButtonText className="font-medium">Update Password</ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const VerifyOtp = () => {
  return (
    <AppLayout
      title="Enter OTP & New Password"
      content="A verification code has been sent to sidhar@gmail.com"
    >
      <VerifyOtpScreen userEmail="example@mail.com" isEmail={true} />
    </AppLayout>
  );
};
