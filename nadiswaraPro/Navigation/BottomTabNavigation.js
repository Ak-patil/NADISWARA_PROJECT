import { Nunito_600SemiBold, useFonts } from "@expo-google-fonts/nunito";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements"; // You can use any icon library or custom icons
import AddPatient from "../../AppModules/Home/Views/AddPatient";
import ManagePatient from "../../AppModules/Home/Views/ManagePatient";
import EditProfile from "../../AppModules/MyProfile/View/EditProfile";
import Profile from "../../AppModules/MyProfile/View/Profile";
import Colors from "../Utils/Color";
import { moderateScale, verticalScale } from "../Utils/Metrics";
import HomeNavigation from "./HomeNavigation";

// Create instances of your navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const _platform = Platform.OS === "ios" ? true : false;

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

const ManagePatientNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManagePatient"
        component={ManagePatient}
        options={{
          headerShown: true,
          title: "All Patients",
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

const BottomTabNavigation = () => {
  let [fontsLoaded, fontError] = useFonts({ Nunito_600SemiBold });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Group
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, focused }) => {
              let iconName;
              let iconSize = focused ? 30 : 24; // Animate the size based on focus

              if (route.name === "Home") {
                // Example: Set the icon for Home tab
                iconName = "home"; // Use an icon name or a custom icon
              } else if (route.name === "All Patients") {
                iconName = "people"; // Use an icon name or a custom icon
              } else if (route.name === "All Reports") {
                iconName = "person"; // Use an icon name or a custom icon
              } else if (route.name === "Profile") {
                iconName = "person"; // Use an icon name or a custom icon
              }

              return (
                <Icon
                  name={iconName}
                  size={iconSize}
                  color={color} // Icon color changes based on focus
                  type="material" // You can use your preferred icon library
                  style={{
                    transform: [{ scale: focused ? 1.2 : 1 }], // Scale animation for focus effect
                  }}
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
            tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE, // Active tab icon color
            tabBarInactiveTintColor: "#888", // Inactive tab icon color
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigation}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="All Patients"
            component={ManagePatientNavigation}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="All reports"
            component={ProfileNavigation}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileNavigation}
            options={{ headerShown: false }}
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
