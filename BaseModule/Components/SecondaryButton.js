import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import ThemeContext from "../config/Theme/ThemeContext";

export default function SecondaryButton({
  onPress,
  buttonTitle,
  buttonStyles,
  firstContainerStyle,
  secondContainerStyle,
  titleStyle,
}) {
  const styles = CustomStyles();
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <View style={[styles.firstContainer, { ...firstContainerStyle }]}>
        <Text style={[styles.title, { ...titleStyle }]}>{buttonTitle}</Text>
      </View>
      <View style={[styles.secondContainer, { ...secondContainerStyle }]} />
    </TouchableOpacity>
  );
}

export const CustomStyles = () => {
  const { theme } = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    firstContainer: {
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: theme.cyan_Blue,
      height: 38,
      justifyContent: "center",
    },

    title: {
      textAlign: "center",
      paddingHorizontal: 10,
      fontSize: 14,
      color: theme.cyan_Blue,
      fontFamily: "Urbanist-Medium",
    },

    secondContainer: {
      borderRadius: 12,
      borderWidth: 0.5,
      borderColor: theme.cyan_Blue,
      width: "100%",
      // height: 33,
      position: "absolute",
      top: 5,
      right: 3,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderTopStartRadius: 7,
      borderBottomRightRadius: 12,
      borderTopRightRadius: 0,
      height: 36,
    },
  });
  return styles;
};
