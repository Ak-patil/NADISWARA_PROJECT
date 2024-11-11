import { StyleSheet } from "react-native";
import Colors from "../../../nadiswaraPro/Utils/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../nadiswaraPro/Utils/Metrics";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    justifyContent: "center",
  },
  login: {
    fontSize: moderateScale(24),
    fontWeight: "500",
    color: "#0f0f0f",
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
  loginToYour: {
    fontSize: moderateScale(14),
    color: "#848484",
    textAlign: "center",
    width: horizontalScale(277),
    marginBottom: verticalScale(20),
  },
  card: {
    flex: 1,
    width: horizontalScale(340),
    height: "85%",
    backgroundColor: "white",
    marginBottom: moderateScale(12),
    borderRadius: moderateScale(20),
    elevation: 5,
    alignItems: "center",
  },
  signInImage: {
    width: horizontalScale(240),
    height: verticalScale(163.53),
    alignSelf: "center",
    marginTop: verticalScale(75),
    marginBottom: verticalScale(20),
  },
  inputContainer: {
    rowGap: moderateScale(16),
  },
  input: {
    fontSize: moderateScale(16),
    width: "100%",
    backgroundColor: "white",
    color: "black",
    marginBottom: verticalScale(10),
  },
  errorContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 145,
  },
  forgotSection: {
    fontSize: moderateScale(14),
    color: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    marginVertical: verticalScale(12),
    fontWeight: "500",
    textAlign: "right",
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(50),
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(20),
  },
  buttonContainerGoogle: {
    backgroundColor: "white",
    borderWidth: 1,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(50),
    borderRadius: moderateScale(50),
    marginBottom: verticalScale(20),
  },
  visibleIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    top: verticalScale(15),
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  errorText2: {
    color: "red",
    fontSize: 11,
    marginTop: -1,
  },
  buttonTextGoogle: {
    color: "black",
    textAlign: "center",
    fontSize: moderateScale(16),
  },
  signupRedirect: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: verticalScale(10),
  },
  signupTextStyle: { fontSize: moderateScale(16), color: "#0F0F0F" },
  signupText: {
    color: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    fontSize: moderateScale(16),
    marginLeft: horizontalScale(5),
  },
  errorText: {
    color: "red",
    fontSize: moderateScale(12),
    textAlign: "center",
    marginBottom: verticalScale(10),
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    position: "absolute",
    top: 60,
  },
});

export default styles;
