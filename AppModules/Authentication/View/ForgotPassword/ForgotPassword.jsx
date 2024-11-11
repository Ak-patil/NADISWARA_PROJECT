import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../Style/ForgotPassword.styles";

const ForgotPassword = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <Text>Hello world</Text>
    </View>
  );
};

export default ForgotPassword;
