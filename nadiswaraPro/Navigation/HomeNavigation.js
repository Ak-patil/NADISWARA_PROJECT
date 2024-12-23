import AddPatient from "../../AppModules/Home/Views/AddPatient";
import AllPatients from "../../AppModules/Home/Views/AllPatients";
import AnalysePulse from "../../AppModules/Home/Views/Analyse";
import DeviceConnection from "../../AppModules/Home/Views/DeviceConnection";
import FetchReport from "../../AppModules/Home/Views/FetchReport";
import Home from "../../AppModules/Home/Views/Home";
import ManagePatient from "../../AppModules/Home/Views/ManagePatient";
import { FormTwo } from "../../AppModules/Home/Views/Questionaries";
import { FormOne } from "../../AppModules/Home/Views/QuestionariesOne";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import Profile from "../../AppModules/MyProfile/View/Profile";

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
        name="FormOne"
        component={FormOne}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="FormTwo"
        component={FormTwo}
        options={{
          headerShown: true,
          title: "",
        }}
      />
      <Stack.Screen
        name="AllPatients"
        component={AllPatients}
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
      <Stack.Screen
        name="ManagePatient"
        component={ManagePatient}
        options={{
          headerShown: true,
          title: "Manage patients",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="DeviceConnection"
        component={DeviceConnection}
        options={{
          headerShown: true,
          title: "Device",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="AnalysePulse"
        component={AnalysePulse}
        options={{
          headerShown: true,
          title: "Pulse",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="FetchReport"
        component={FetchReport}
        options={{
          headerShown: true,
          title: "Fetched Report",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
