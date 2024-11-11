import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { Raleway_700Bold, useFonts } from "@expo-google-fonts/raleway";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "../../Style/WelcomeScreen.styles";

const Welcome = () => {
  const navigation = useNavigation();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.firstContainer}>
      <View>
        <Image style={styles.logo} />
      </View>
      <View style={styles.titleWrapper}>
        <Text style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}>
          Welcome{" "}
        </Text>
      </View>
      <View>
        <Text
          style={[styles.titleText, { fontFamily: "Raleway_700Bold" }]}
        ></Text>
      </View>

      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => navigation.navigate("Welcome Intro")}
      >
        <Text style={[styles.buttonText, { fontFamily: "Nunito_700Bold" }]}>
          Getting Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
