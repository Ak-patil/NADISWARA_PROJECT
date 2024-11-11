import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { Nunito_600SemiBold, useFonts } from "@expo-google-fonts/nunito";
import { Image, Platform, StyleSheet, View } from "react-native";
import EditProfile from "../../AppModules/MyProfile/View/EditProfile";
import Profile from "../../AppModules/MyProfile/View/Profile";
import HomeNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../Utils/Metrics";

const _platform = Platform.OS === "ios" ? true : false;

const Tab = createBottomTabNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Group
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;

              if (route.name === "Home") {
                // iconName = <Icon as={ArrowLeftIcon} className="md:hidden text-background-800" size="xl" />;
              } else if (route.name === "Profile") {
                // iconName = <Icon as={ArrowLeftIcon} className="md:hidden text-background-800" size="xl" />;
              }

              return (
                <Image
                  style={{
                    width: horizontalScale(24),
                    height: verticalScale(24),
                    tintColor: "black",
                  }}
                  // source={iconName}
                />
              );
            },
            tabBarLabelStyle: {
              color: "black",
              fontSize: moderateScale(14),
              fontFamily: "Nunito_600SemiBold",
              marginBottom: _platform ? verticalScale(-4) : verticalScale(15),
            },
            tabBarHideOnKeyboard: true,
            tabBarStyle: { height: verticalScale(70) },
            tabBarIconStyle: { marginTop: verticalScale(7) },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{
              headerShown: false,
            }}
          />
        </Tab.Group>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabNavigation;
