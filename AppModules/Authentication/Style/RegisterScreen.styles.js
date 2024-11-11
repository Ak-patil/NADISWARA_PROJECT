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
  card: {
    flex: 1,
    width: horizontalScale(340),
    height: "70%",
    backgroundColor: "white",
    marginBottom: moderateScale(12),
    borderRadius: moderateScale(20),
    elevation: 5,
    alignItems: "center",
  },
  buttonContainerGoogle: {
    backgroundColor: "white",
    borderWidth: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(50),
    borderRadius: moderateScale(50),
  },

  signupImage: {
    width: horizontalScale(240),
    height: verticalScale(163.53),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },

  getStartedText: {
    fontSize: moderateScale(24),
    fontWeight: "500",
    color: "#0f0f0f",
    textAlign: "center",
    marginVertical: verticalScale(10),
  },

  accountCreateText: {
    fontSize: moderateScale(14),
    color: "#848484",
    textAlign: "center",
    width: horizontalScale(277),
    marginBottom: verticalScale(20),
  },

  inputContainer: {
    rowGap: moderateScale(25),
  },

  input: {
    fontSize: moderateScale(16),
    width: "100%",
    backgroundColor: "white",
    color: "black",
    marginBottom: verticalScale(10),
  },

  icon1: {
    position: "absolute",
    left: horizontalScale(24),
    top: verticalScale(17),
  },

  icon2: {
    position: "absolute",
    left: horizontalScale(24),
    top: verticalScale(17.8),
    marginTop: verticalScale(-2),
  },

  visibleIcon: {
    position: "absolute",
    alignSelf: "flex-end",
    top: verticalScale(15),
  },

  buttonTextGoogle: {
    color: "black",
    textAlign: "center",
    fontSize: moderateScale(16),
  },

  buttonContainer: {
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(50),
    borderRadius: moderateScale(50),
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: moderateScale(16),
  },

  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: horizontalScale(16),
    justifyContent: "center",
    marginBottom: verticalScale(20),
  },

  signupTextStyle: { fontSize: moderateScale(16), color: "#0F0F0F" },

  signupText: {
    color: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    marginLeft: horizontalScale(5),
  },

  errorText: {
    color: "red",
    fontSize: moderateScale(11),
    marginTop: -1,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalScale(16),
    position: "absolute",
    top: verticalScale(45),
  },

  errorText1: {
    color: "red",
    fontSize: moderateScale(11),
    marginTop: -1,
  },

  errorContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: horizontalScale(16),
    position: "absolute",
    top: verticalScale(55),
  },
});

export default styles;
