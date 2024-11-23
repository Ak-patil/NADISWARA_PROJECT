import { HStack } from "@/components/ui";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { handleNavigation } from "@/nadiswaraPro/Navigation/NaviagationHelper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { loginViaEmailRequest } from "../../Redux/Actions/AuthAction";
import { loginViaEmailStateSelector } from "../../Redux/Reducer/AuthSelector";
import { AuthLayout } from "../layout";
import { GoogleIcon } from "./assets/icons/google";

const loginSchema = z.object({
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
  password: z.string().min(1, "Password is required"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export const LoginWithLeftBackground = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const loginViaEmailState = useSelector((state) =>
    loginViaEmailStateSelector(state)
  );

  const toast = useToast();
  const [validated, setValidated] = useState({
    emailValid: true,
    passwordValid: true,
  });

  const onSubmit = (data: LoginSchemaType) => {
    if (data) {
      dispatch(
        loginViaEmailRequest({
          email_or_phone: data.email_or_phone,
          password: data.password,
        })
      );
    } else {
      reset();
      setValidated({ emailValid: false, passwordValid: true });
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };
  // const router = useRouter();
  return (
    <>
      <VStack className="items-center" space="xs">
        <Heading className="text-[#0f0f0f] font-extrabold" size="2xl">
          Login
        </Heading>
        <Text size="md" className="text-center text-[#848484]">
          Login to your existing account using your email and password
        </Text>
      </VStack>
      <VStack className="w-full" space="xl">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid={!!errors?.email_or_phone || !validated.emailValid}
            className="w-full pt-2"
          >
            <FormControlLabel>
              <FormControlLabelText size="lg">
                Email or phone number
              </FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="email_or_phone"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ email_or_phone: value });
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
                    placeholder="Email or phone number"
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
                {errors?.email_or_phone?.message ||
                  (!validated.emailValid && "Invalid email or phone number")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          {/* Label Message */}
          <FormControl
            isInvalid={!!errors.password || !validated.passwordValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText size="lg">Password</FormControlLabelText>
            </FormControlLabel>
            <Controller
              defaultValue=""
              name="password"
              control={control}
              rules={{
                validate: async (value) => {
                  try {
                    await loginSchema.parseAsync({ password: value });
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
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    onSubmitEditing={handleKeyPress}
                    returnKeyType="done"
                  />
                  <InputSlot onPress={handleState} className="pr-3">
                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                  </InputSlot>
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorText>
                {errors?.password?.message ||
                  (!validated.passwordValid && "Password was incorrect")}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <Button
            size="lg"
            variant="link"
            action="primary"
            className="justify-end h-6"
            onPress={() => navigation.navigate("VerifyOtpEmail")}
          >
            <ButtonText className="font-extrabold text-md text-primary-prime group-hover/link:text-primary-600 font-ClashMedium">
              Forgot Password?
            </ButtonText>
          </Button>
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
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <ButtonText className="font-medium" children={"Log in"} />
            )}
          </Button>
          <Button
            size="xl"
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => handleNavigation("LoginViaPhone")}
          >
            <ButtonText className="font-medium color-primary-prime">
              Login via OTP
            </ButtonText>
          </Button>
          <Button
            size="xl"
            variant="outline"
            action="secondary"
            className="w-full gap-1"
            onPress={() => handleNavigation("LoginViaPhone")}
          >
            <ButtonIcon as={GoogleIcon} />
            <ButtonText className="font-medium">
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
            <ButtonText className="font-extrabold text-lg text-primary-prime">
              Sign up
            </ButtonText>
          </Button>
        </HStack>
      </VStack>
    </>
  );
};

export const SignIn = ({ navigation }) => {
  return (
    <AuthLayout>
      <LoginWithLeftBackground navigation={navigation} />
    </AuthLayout>
  );
};
