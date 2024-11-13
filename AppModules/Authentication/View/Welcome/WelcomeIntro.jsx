import {
  Nunito_400Regular,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { Raleway_700Bold, useFonts } from "@expo-google-fonts/raleway";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { onboardingSwiperData } from "../../../../nadiswaraPro/Data/OnboardingSwiperData";
import { styles } from "../../Style/WelcomeIntroScreen.styles";

const WelcomeIntro = () => {
  const navigation = useNavigation();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={[styles.title, { fontFamily: "Raleway_700Bold" }]}>
          No Data
        </Text>
      </View>
    </View>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={onboardingSwiperData}
      onDone={() => {
        navigation.navigate("signin");
      }}
      onSkip={() => {
        navigation.navigate("signin");
      }}
      renderNextButton={() => (
        <View style={styles.buttonContainer}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Next
          </Text>
        </View>
      )}
      renderDoneButton={() => (
        <View style={styles.buttonContainer}>
          <Text
            style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}
          >
            Done
          </Text>
        </View>
      )}
      showSkipButton={false}
      dotStyle={styles.dotStyle}
      bottomButton={true}
      activeDotStyle={styles.activeDotStyle}
    />
  );
};

export default WelcomeIntro;
