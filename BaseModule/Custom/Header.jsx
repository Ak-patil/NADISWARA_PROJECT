import React from "react";
import { Image, View } from "react-native";
import { styles } from "./styles/Header.styles";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.signInImage}
        source={require("../../assets/oohy_icon.png")}
      />
      <Image
        style={styles.signInImage}
        source={require("../../assets/BellSimpleRinging.png")}
      />
    </View>
  );
};

export default Header;
