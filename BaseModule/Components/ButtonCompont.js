import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ButtonCompont({ name, color }) {
  const styles = CustomStyles();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {}}
        style={[
          styles.manageButtonContainer,
          {
            borderLeftColor: color,
            borderBottomColor: color,
          },
        ]}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.manageButtonText}>{name}</Text>
        </View>
        <View>
          <Image
            style={styles.Img}
            source={require("../assets/images/back/backRight.png")}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export const CustomStyles = () => {
  const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    manageButtonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

      padding: 18,
      borderRadius: 15,
      borderLeftWidth: 4,
      borderBottomWidth: 4,
      width: "85%",
    },

    manageButtonText: {
      paddingVertical: 7,
      fontSize: 20,
      fontWeight: "700",

      fontFamily: "Urbanist-Regular",
      textTransform: "uppercase",
    },
    Img: {
      height: 12,
      width: 12,
    },
  });
  return styles;
};
