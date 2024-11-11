import { Raleway_700Bold, useFonts } from "@expo-google-fonts/raleway";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles/CustomBackHeader.styles";

const CustomBackHeader = ({ children }) => {
  const navigation = useNavigation();

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIconWrapper}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={24} color={"black"} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomBackHeader;
