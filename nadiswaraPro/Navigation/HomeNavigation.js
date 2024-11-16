import AddPatient from "../../AppModules/Home/Views/AddPatient";
import ManagePatient from "../../AppModules/Home/Views/ManagePatient";

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
      <Stack.Screen
        name="ManagePatient"
        component={ManagePatient}
        options={{ headerShown: true, title: "Manage patients" }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
