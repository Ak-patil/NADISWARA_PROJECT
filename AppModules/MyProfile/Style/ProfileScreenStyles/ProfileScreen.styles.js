import { StyleSheet } from "react-native";
import Colors from "../../../../nadiswaraPro/Utils/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../nadiswaraPro/Utils/Metrics";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  mainBannerContainer: {
    padding: moderateScale(16),
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(20),
  },

  bannerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  status: {
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  userImage: { width: horizontalScale(60), height: verticalScale(60) },

  userNameSection: { marginLeft: horizontalScale(20) },

  userNameText: { color: "white", fontSize: moderateScale(20) },

  userNameBottomText: { color: "#abccec", fontSize: moderateScale(15) },

  userImageBorder: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: moderateScale(50),
  },

  achiveContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    columnGap: 8,
    marginTop: verticalScale(20),
  },

  achiveWrapper: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1153B4",
    borderRadius: moderateScale(15),
    padding: moderateScale(15),
    height: verticalScale(60),
    flex: 1,
  },

  achiveText: {
    color: "white",
    marginTop: verticalScale(5),
    textAlign: "center",
  },

  refferContainer: {
    backgroundColor: "white",
    marginTop: verticalScale(20),
    padding: moderateScale(15),
    borderRadius: moderateScale(15),
  },

  referralText: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(10),
  },

  invititionText: { color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN },

  accountDetailsContainer: {
    marginHorizontal: horizontalScale(16),
    marginTop: verticalScale(30),
  },

  accountText: { fontSize: moderateScale(20), marginBottom: verticalScale(16) },

  detailWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(20),
  },

  detailUserIcon: {
    borderWidth: 2,
    borderColor: "#dde2ec",
    padding: moderateScale(15),
    borderRadius: moderateScale(100),
    width: horizontalScale(55),
    height: verticalScale(55),
  },

  detailLeftSection: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: moderateScale(30),
  },

  boldText: { fontSize: moderateScale(16) },

  regularText: { color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN },

  iconCenter: { alignSelf: "center" },
});
