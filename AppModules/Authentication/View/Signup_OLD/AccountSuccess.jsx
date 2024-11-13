import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { handleNavigation } from "../../../../nadiswaraPro/Navigation/NaviagationHelper";
import Colors from "../../../../nadiswaraPro/Utils/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../nadiswaraPro/Utils/Metrics";

const AccountSuccess = ({ navigation }) => {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const continueButton = () => {
    handleNavigation("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.signupImage}
        source={require("../../../../assets/success.png")}
      />
      <Text
        style={{
          color: "#0F0F0F",
          textAlign: "center",
          fontWeight: 500,
          fontSize: moderateScale(18),
          paddingVertical: verticalScale(16),
        }}
      >
        Woohoo! Your account has been created successfully!
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => continueButton()}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountSuccess;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: horizontalScale(16),
  },

  signupImage: {
    // width: horizontalScale(240),
    // height: verticalScale(163.53),
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    width: "100%",
    position: "absolute",
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(50),
    bottom: verticalScale(32),
    alignSelf: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
  },
});
