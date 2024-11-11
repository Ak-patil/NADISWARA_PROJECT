import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
} from "../../../../nadiswaraPro/Utils/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  textContainer: { paddingHorizontal: horizontalScale(16) },
  text1: { fontSize: moderateScale(20), fontWeight: "500", color: "#0F0F0F" },
});
