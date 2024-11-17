import { SignIn } from "@/AppModules/Authentication/View/signin";
import { SignUp } from "@/AppModules/Authentication/View/signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { CardStyleInterpolators } from "@react-navigation/stack";
import { ForgotPassword } from "@/AppModules/Authentication/View/forgot-password";
import React from "react";
import { Easing } from "react-native";
import AccountSuccess from "../../AppModules/Authentication/View/Signup_OLD/AccountSuccess";
import OtpScreen from "../../AppModules/Authentication/View/Signup_OLD/OtpScreen";
import { VerifyOtp } from "../../AppModules/Authentication/View/forgot-password/verify_otp";
import { VerifyOtpEmail } from "../../AppModules/Authentication/View/forgot-password/verify_otp_email";

const Stack = createNativeStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
      }}
      headerMode="float"
      animation="fade"
    >
      <Stack.Screen
        name="signin"
        component={SignIn}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{
          title: "Verify Otp",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="VerifyOtpEmail"
        component={VerifyOtpEmail}
        options={{
          title: "Forgot password",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AccountSuccess"
        component={AccountSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false, animation: "slide_from_right" }}
      />

      <Stack.Screen
        name="forgot-password"
        component={ForgotPassword}
        options={{
          title: "Forgot password",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
