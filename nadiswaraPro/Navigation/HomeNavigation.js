import AddPatient from "@/AppModules/Home/Views/AddPatient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../../AppModules/Home/Views/Home";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddPatient"
        component={AddPatient}
        options={{ headerShown: true, title: "Add new patient" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
