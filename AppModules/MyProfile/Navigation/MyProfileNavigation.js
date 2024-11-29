import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SCREEN_OPTIONS } from "../../../gigfws/Navigation/ScreenOptions";
import { ProfileScreen } from "../View/index";

const MyProfileStack = createNativeStackNavigator();

export const MyProfileStackScreen = () => {
  return (
    <MyProfileStack.Navigator headerMode="none">
      <MyProfileStack.Screen
        options={{
          headerShown: false,
        }}
        name={SCREEN_OPTIONS.MYPROFILE.route_name}
        title={SCREEN_OPTIONS.MYPROFILE.screen_title}
        component={ProfileScreen}
      />
    </MyProfileStack.Navigator>
  );
};
