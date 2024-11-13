import { SignIn } from "@/AppModules/Authentication/View/signin";
import { SignUp } from "@/AppModules/Authentication/View/signup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AccountConfirmation from "../../AppModules/Authentication/View/AccountConfirmation/AccountConfirmation";
import ForgotPassword from "../../AppModules/Authentication/View/ForgotPassword/ForgotPassword";
import AccountSuccess from "../../AppModules/Authentication/View/Signup_OLD/AccountSuccess";
import OtpScreen from "../../AppModules/Authentication/View/Signup_OLD/OtpScreen";
import WelcomeScreen from "../../AppModules/Authentication/View/Welcome/WelcomeScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
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
        name="AccountSuccess"
        component={AccountSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signup"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account Confirmation"
        component={AccountConfirmation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot Password"
        component={ForgotPassword}
        options={{
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
