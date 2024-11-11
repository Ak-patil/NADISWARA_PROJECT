import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AccountConfirmation from "../../AppModules/Authentication/View/AccountConfirmation/AccountConfirmation";
import ForgotPassword from "../../AppModules/Authentication/View/ForgotPassword/ForgotPassword";
import Login from "../../AppModules/Authentication/View/Login/LoginScreen";
import AccountSuccess from "../../AppModules/Authentication/View/Signup/AccountSuccess";
import OtpScreen from "../../AppModules/Authentication/View/Signup/OtpScreen";
import SignupScreen from "../../AppModules/Authentication/View/Signup/SignupScreen";
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
        name="Login"
        component={Login}
        options={{ headerShown: false }}
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
        name="Register"
        component={SignupScreen}
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
