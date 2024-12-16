import { Nunito_600SemiBold, useFonts } from "@expo-google-fonts/nunito";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeartPulse, Home, User2, Users } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import AddPatient from "../../AppModules/Home/Views/AddPatient";
import AllPatients from "../../AppModules/Home/Views/AllPatients";
import AllReports from "../../AppModules/Home/Views/AllReports";
import { PatientHistoryScreen } from "../../AppModules/Home/Views/PatientHistoryScreen";
import { AddBalanceScreen } from "../../AppModules/MyProfile/View/AddBalanceScreen";
import { ChangePasswordScreen } from "../../AppModules/MyProfile/View/ChangePasswordScreen";
import { DeviceEnrolmentScreen } from "../../AppModules/MyProfile/View/DeviceEnrolmentScreen";
import { WalletScreen } from "../../AppModules/MyProfile/View/WalletScreen";
import { ProfileScreen } from "../../AppModules/MyProfile/View/index";
import { isAndroid, isValidElement } from "../../BaseModule/Utils/helpers";
import { Icon } from "../../components/ui/icon";
import Colors from "../Utils/Color";
import { moderateScale, verticalScale } from "../Utils/Metrics";
import HomeNavigation from "./HomeNavigation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const _platform = Platform.OS === "ios" ? true : false;

const ProfileNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          headerShown: true,
          title: "Wallet",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DeviceEnrolment"
        component={DeviceEnrolmentScreen}
        options={{
          headerShown: true,
          title: "Enroll device",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          headerShown: true,
          title: "Change password",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddBalanceScreen"
        component={AddBalanceScreen}
        options={{
          headerShown: true,
          title: "Add balance",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const ManagePatientNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllPatients"
        component={AllPatients}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PatientHistory"
        component={PatientHistoryScreen}
        options={{
          headerShown: true,
          title: "Patient Details",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          headerShown: true,
          title: "Add new patient",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const AllReportsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllReportsScreen"
        component={AllReports}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigation = () => {
  let [fontsLoaded, fontError] = useFonts({ Nunito_600SemiBold });
  const [currentNavigation, setCurrentNavigation] = useState("");

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: verticalScale(70) },
          tabBarIconStyle: { marginTop: verticalScale(7) },
          tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
          tabBarInactiveTintColor: "#888",
        })}
      >
        <Tab.Screen
          options={({ navigation }) => {
            const display = getDisplayOptionForTab(
              navigation,
              setCurrentNavigation
            );
            return {
              tabBarStyle: [
                isAndroid()
                  ? {
                      height: display === "flex" ? verticalScale(60) : 0,
                      paddingBottom: display === "flex" ? verticalScale(2) : 0,
                    }
                  : { height: display === "flex" ? verticalScale(80) : 0 },
              ],
              title: display === "flex" ? "Home" : "",
              tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
              tabBarInactiveTintColor: "#888",
              tabBarLabelStyle: {
                fontSize: display === "flex" ? moderateScale(14) : null,
                paddingBottom: display === "flex" ? verticalScale(4) : null,
              },
              tabBarIcon: ({ color, size }) => (
                <Icon
                  as={Home}
                  size={display === "flex" ? size : -1}
                  style={{
                    paddingTop: display === "flex" ? verticalScale(4) : 0,
                  }}
                />
              ),
            };
          }}
          name="Home"
          component={HomeNavigation}
        />
        <Tab.Screen
          name="All Patients"
          component={ManagePatientNavigation}
          options={({ navigation }) => {
            const display = getDisplayOptionForTab(
              navigation,
              setCurrentNavigation
            );
            return {
              tabBarStyle: [
                isAndroid()
                  ? {
                      height: display === "flex" ? verticalScale(60) : 0,
                      paddingBottom: display === "flex" ? verticalScale(2) : 0,
                    }
                  : { height: display === "flex" ? verticalScale(80) : 0 },
              ],
              title: display === "flex" ? "All Patients" : "",
              tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
              tabBarInactiveTintColor: "#888",
              tabBarLabelStyle: {
                fontSize: display === "flex" ? moderateScale(14) : null,
                paddingBottom: display === "flex" ? verticalScale(4) : null,
              },
              tabBarIcon: ({ color, size }) => (
                <Icon
                  as={Users}
                  size={display === "flex" ? size : -1}
                  style={{
                    paddingTop: display === "flex" ? verticalScale(4) : null,
                  }}
                />
              ),
            };
          }}
        />
        <Tab.Screen
          name="All reports"
          component={AllReportsNavigation}
          options={({ navigation }) => {
            const display = getDisplayOptionForTab(
              navigation,
              setCurrentNavigation
            );
            return {
              tabBarStyle: [
                isAndroid()
                  ? {
                      height: display === "flex" ? verticalScale(60) : 0,
                      paddingBottom: display === "flex" ? verticalScale(2) : 0,
                    }
                  : { height: display === "flex" ? verticalScale(80) : 0 },
              ],
              title: display === "flex" ? "All Reports" : "",
              tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
              tabBarInactiveTintColor: "#888",
              tabBarLabelStyle: {
                fontSize: display === "flex" ? moderateScale(14) : null,
                paddingBottom: display === "flex" ? verticalScale(4) : null,
              },
              tabBarIcon: ({ color, size }) => (
                <Icon
                  as={HeartPulse}
                  size={display === "flex" ? size : -1}
                  style={{
                    paddingTop: display === "flex" ? verticalScale(4) : null,
                  }}
                />
              ),
            };
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigation}
          options={({ navigation }) => {
            const display = getDisplayOptionForTab(
              navigation,
              setCurrentNavigation
            );
            return {
              tabBarStyle: [
                isAndroid()
                  ? {
                      height: display === "flex" ? verticalScale(60) : 0,
                      paddingBottom: display === "flex" ? verticalScale(2) : 0,
                    }
                  : { height: display === "flex" ? verticalScale(80) : 0 },
              ],
              title: display === "flex" ? "Profile" : "",
              tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
              tabBarInactiveTintColor: "#888",
              tabBarLabelStyle: {
                fontSize: display === "flex" ? moderateScale(14) : null,
                paddingBottom: display === "flex" ? verticalScale(4) : null,
              },
              tabBarIcon: ({ color, size }) => (
                <Icon
                  as={User2}
                  size={display === "flex" ? size : -1}
                  style={{
                    paddingTop: display === "flex" ? verticalScale(4) : null,
                  }}
                />
              ),
            };
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const getDisplayOptionForTab = (navigation, setCurrentNavigation) => {
  let display = "flex";
  if (isValidElement(navigation) && isValidElement(navigation.getState())) {
    try {
      const navigationState = navigation.getState();
      let currentNavigation = navigationState.routes[navigationState.index];
      setCurrentNavigation(navigationState.index);
      if (
        isValidElement(currentNavigation) &&
        isValidElement(currentNavigation.state)
      ) {
        const routes = currentNavigation.state.routes;
        if (routes.length > 1) {
          display = "none";
        }
      }
    } catch (e) {
      display = "flex";
    }
  }
  return display;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabNavigation;
