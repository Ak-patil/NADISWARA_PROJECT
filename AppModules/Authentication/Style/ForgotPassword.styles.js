import { StyleSheet } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../nadiswaraPro/Utils/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(16),
  },
  headerText: {
    fontSize: moderateScale(18),
    textAlign: "center",
    marginBottom: verticalScale(20),
  },
  input: {
    width: "100%",
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  button: {
    backgroundColor: "#3876EE",
    width: "100%",
    height: verticalScale(45),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(5),
  },
  buttonText: {
    color: "white",
    fontSize: moderateScale(16),
  },
  loginLink: {
    flexDirection: "row",
    marginTop: verticalScale(30),
  },
  loginText: {
    color: "#3876EE",
    marginLeft: horizontalScale(5),
    fontSize: moderateScale(16),
  },

  backText: { fontSize: moderateScale(16) },
});

export default styles;
