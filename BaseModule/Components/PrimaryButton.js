import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function PrimaryButton({
  buttonTitle,
  buttonContainerStyle,
  buttonTitleStyle,
  onPress,
  disabled,
  type,
  borderShade,
}) {
  const styles = CustomStyles();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        type == "secondary" && { ...styles.secondaryContainer },
        borderShade == "dark" && { ...styles.borderColorContainer },
        buttonContainerStyle,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          type == "secondary" && { ...styles.secondaryButtonTitle },
          { ...buttonTitleStyle },
        ]}
      >
        {buttonTitle}
      </Text>
    </TouchableOpacity>
  );
}

export const CustomStyles = () => {
  // const { theme } = React.useContext(ThemeContext);
  const styles = StyleSheet.create({
    buttonContainer: {
      borderRadius: 12,
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      // backgroundColor: theme.primaryButtonColor,
      // borderBottomColor: theme.borderColor,
      // borderLeftColor: theme.borderColor,
      height: 40,
      justifyContent: "center",
    },
    buttonText: {
      textAlign: "center",
      // paddingVertical: 7,
      paddingHorizontal: 10,
      fontSize: 14,
      // color: theme.cyan_Blue,
      fontFamily: "Urbanist-Medium",
    },
    secondaryContainer: {
      borderRadius: 12,
      backgroundColor: "#F6F6F6",
      borderLeftColor: "#000000",
      borderBottomColor: "#000000",
      borderWidth: 0.5,
    },
    secondaryButtonTitle: {
      // color: theme.cyan_Blue,
      textAlign: "center",
      fontFamily: "Urbanist-Medium",
    },
    borderColorContainer: {
      // borderLeftColor: theme.popularGymBorderColor,
      // borderBottomColor: theme.popularGymBorderColor,
    },
  });
  return styles;
};
