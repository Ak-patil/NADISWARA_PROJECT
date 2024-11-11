import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "../Style/ProfileScreenStyles/ProfileScreen.styles";

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
        <SafeAreaView style={styles.container}>
          {/* <CustomDrawerHeader>Profile</CustomDrawerHeader> */}
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Profile;
