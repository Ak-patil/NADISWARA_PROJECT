import { appendObjectToForm } from "@/BaseModule/Utils/helpers";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { signupViaEmailRequest } from "../../Redux/Actions/AuthAction";
import { signupViaEmailStateSelector } from "../../Redux/Reducer/AuthSelector";
import { AuthLayout } from "../layout";
import { GoogleIcon } from "./assets/icons/google";

const signUpSchema = z.object({
  email_or_phone: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[6-9]\d{9}$/.test(value),
      {
        message: "Enter a valid email or phone number",
      }
    ),
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
  rememberme: z.boolean().optional(),
});
type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUpWithLeftBackground = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const toast = useToast();
  const dispatch = useDispatch();

  const signupViaEmailState = useSelector((state) =>
    signupViaEmailStateSelector(state)
  );

  const onSubmit = (data: SignUpSchemaType) => {
    if (data) {
      const userData = {
        "email/phone_number": data.email_or_phone,
        password1: data.password,
        password2: data.confirmpassword,
      };
      const updatedForm = appendObjectToForm(userData);
      dispatch(signupViaEmailRequest(updatedForm));
    } else {
      reset();
      toast.show({
        placement: "bottom right",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} variant="accent" action="error">
              <ToastTitle>Passwords do not match</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleConfirmPwState = () => {
    setShowConfirmPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="items-center" space="xs">
        <Heading className="text-center font-ClashMedium" size="xl">
          Sign up
        </Heading>
        <Text
          size="md"
          className="text-center text-text-text2 font-ClashMedium"
        >
          Sign up and start using gluestack
        </Text>
      </VStack>

      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl isInvalid={!!errors.email_or_phone}>
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Email or phone number
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              name="email_or_phone"
              defaultValue=""
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({ email_or_phone: value });
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
                    placeholder="Email or phone number"
                    type="text"
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
              <FormControlErrorText className="font-ClashRegular">
                {errors?.email_or_phone?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                New password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({
                      password: value,
                    });
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
                    placeholder="New password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText className="font-ClashRegular">
                {errors?.password?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmpassword}>
            <FormControlLabel>
              <FormControlLabelText size="lg" className="font-ClashMedium">
                Confirm new password
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="confirmpassword"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await signUpSchema.parseAsync({
                      password: value,
                    });
                    return true;
                  } catch (error: any) {
                    return error.message;
                  }
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input size="lg">
                  <InputField
                    placeholder="Confirm new password"
                    className="text-md font-ClashRegular"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
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
              <FormControlErrorText className="font-ClashRegular">
                {errors?.confirmpassword?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>

        <VStack className="w-full my-7" space="lg">
          <Button
            size="xl"
            variant="solid"
            action="primary"
            className="w-full"
            onPress={handleSubmit(onSubmit)}
          >
            {signupViaEmailState?.isLoading ? (
              <Spinner size="small" className="color-white" />
            ) : (
              <ButtonText
                size="lg"
                className="font-ClashMedium"
                children={"Signup"}
              />
            )}
          </Button>
          <Button
            size="xl"
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => handleNavigation("LoginViaPhone")}
          >
            <ButtonText
              size="lg"
              className="font-ClashMedium color-primary-prime"
            >
              Login via OTP
            </ButtonText>
          </Button>
          <Button
            size="xl"
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
          <Text size="lg" className="font-ClashMedium">
            Already have an account?
          </Text>
          <Button
            size="lg"
            variant="link"
            action="primary"
            className="justify-end"
            onPress={() => navigation.navigate("signin")}
          >
            <ButtonText className="font-ClashSemiBold text-lg text-primary-prime">
              Sign
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  );
};

export const SignUp = ({ navigation }) => {
  return (
    <AuthLayout>
      <SignUpWithLeftBackground navigation={navigation} />
    </AuthLayout>
  );
};
