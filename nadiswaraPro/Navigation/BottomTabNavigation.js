import { Nunito_600SemiBold, useFonts } from "@expo-google-fonts/nunito";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeartPulse, Home, User2, Users } from "lucide-react-native";
import React from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import AddPatient from "../../AppModules/Home/Views/AddPatient";
import ManagePatient from "../../AppModules/Home/Views/ManagePatient";
import { AddBalanceScreen } from "../../AppModules/MyProfile/View/AddBalanceScreen";
import EditProfile from "../../AppModules/MyProfile/View/EditProfile";
import { WalletScreen } from "../../AppModules/MyProfile/View/WalletScreen";
import { ProfileScreen } from "../../AppModules/MyProfile/View/index";
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
        name="AddBalanceScreen"
        component={AddBalanceScreen}
        options={{
          headerShown: true,
          title: "Add balance",
          headerTitleAlign: "center",
        }}
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, focused }) => {
            const animatedValue = new Animated.Value(focused ? 1 : 0);
            const animatedColor = animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ["#888", Colors.PRIMARY.PRIMARY_PURPLE],
            });

            const AnimatedIcon = Animated.createAnimatedComponent(Icon);

            let iconName;
            if (route.name === "Home") iconName = Home;
            else if (route.name === "All Patients") iconName = Users;
            else if (route.name === "All reports") iconName = HeartPulse;
            else if (route.name === "Profile") iconName = User2;

            Animated.timing(animatedValue, {
              toValue: focused ? 1 : 0,
              duration: 200,
              useNativeDriver: false,
            }).start();

            return (
              <AnimatedIcon
                as={iconName}
                style={{
                  color: animatedColor,
                  width: focused ? 30 : 25,
                  height: focused ? 30 : 25,
                }}
              />
            );
          },
          tabBarLabel: ({ focused }) => (
            <Animated.Text
              style={{
                color: focused ? Colors.PRIMARY.PRIMARY_PURPLE : "#888",
                fontSize: moderateScale(14),
                fontFamily: "Nunito_600SemiBold",
                marginBottom: _platform ? verticalScale(-4) : verticalScale(15),
              }}
            >
              {route.name}
            </Animated.Text>
          ),
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: verticalScale(70) },
          tabBarIconStyle: { marginTop: verticalScale(7) },
          tabBarActiveTintColor: Colors.PRIMARY.PRIMARY_PURPLE,
          tabBarInactiveTintColor: "#888",
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
