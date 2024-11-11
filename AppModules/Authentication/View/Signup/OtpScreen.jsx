import React, { useRef, useState } from "react";

import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  useFonts,
} from "@expo-google-fonts/nunito";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import TimerCount from "../../../../BaseModule/Components/TimerCount";
import CustomBackHeader from "../../../../BaseModule/Custom/CustomBackHeader";
import Colors from "../../../../nadiswaraPro/Utils/Color";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../nadiswaraPro/Utils/Metrics";
import { verifyOtpRequest } from "../../Redux/Actions/AuthAction";
import { verifyOtpStateSelector } from "../../Redux/Reducer/AuthSelector";

const OtpScreen = ({ navigation, userEmail, isEmail }) => {
  const { top } = useSafeAreaInsets();
  const [otp2, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef(Array(6).fill(null));
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const dispatch = useDispatch();

  const verifyOtpState = useSelector((state) => verifyOtpStateSelector(state));

  const handleSubmit = () => {
    const enteredOtp = otp2.join("");
    const payload = {
      otp: enteredOtp,
    };
    dispatch(verifyOtpRequest(payload));
  };

  let emialUsername;
  let emailDomain;
  let phoneNumber;

  if (isEmail) {
    const splitEmail = userEmail?.split("@");
    const username = splitEmail[0];
    const domain = splitEmail[1];
    console.log(username, "domain", domain);
    emailDomain = domain;
    if (username.length > 4) {
      const obscuredUsername =
        username.substring(0, 4) + "*".repeat(username.length - 4);
      emialUsername = obscuredUsername;
    } else if (username.length > 3) {
      const obscuredUsername =
        username.substring(0, 3) + "*".repeat(username.length - 3);
      emialUsername = obscuredUsername;
    } else if (username.length > 2) {
      const obscuredUsername =
        username.substring(0, 2) + "*".repeat(username.length - 2);
      emialUsername = obscuredUsername;
    } else {
      emialUsername = username;
    }
  } else {
    obscuredPhone = "xxxxxx" + userEmail?.slice(-4);
    phoneNumber = obscuredPhone;
    // Handle invalid email or phone number case if needed
  }
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }

    const updatedOtp = [...otp2];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    const isFilled = updatedOtp.every((val) => val !== "");
    setIsOtpFilled(isFilled);

    if (value !== "") {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      } else {
        inputRefs.current[index].blur();
      }
    }
  };

  const handleResendClick = () => {
    setOtp(["", "", "", "", "", ""]);
    const enteredOtp = otp2.join("");
    const payload = {
      otp: enteredOtp,
    };
    dispatch(verifyOtpRequest(payload));
  };

  return (
    <>
      <View style={styles.container}>
        <CustomBackHeader>Otp screen</CustomBackHeader>
        <View style={styles.ImageContainer}>
          <Image
            style={styles.signupImage}
            source={require("../../../../assets/Otp_screen.png")}
          />
        </View>
        <Text style={styles.otpText}>Enter OTP</Text>
        <Text style={styles.otpMessage}>
          A verification code has been sent to sidhar@gmail.com
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 8,
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          {otp2.map((value, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              onChangeText={(text) => handleOtpChange(text, index)}
              value={value}
              maxLength={1}
              keyboardType="numeric"
              autoFocus={index === 0}
              ref={(input) => (inputRefs.current[index] = input)}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleSubmit();
          }}
        >
          {verifyOtpState?.isLoading ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
        <View
          style={{
            paddingVertical: verticalScale(12),
            alignSelf: "flex-end",
            paddingRight: 16,
          }}
        >
          <TimerCount handleResendClick={handleResendClick} />
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: horizontalScale(16),
  },
  ImageContainer: {
    flex: 0.3,
    justifyContent: "center",
    backgroundColor: "red",
  },
  otpText: {
    fontSize: moderateScale(24),
    fontWeight: "600",
  },
  otpMessage: {
    color: "#848484",
    fontSize: moderateScale(16),
    textAlign: "center",
  },

  otpInput: {
    borderWidth: 1,
    borderColor: "gray",
    width: horizontalScale(40),
    height: verticalScale(40),
    fontSize: moderateScale(18),
    textAlign: "center",
    borderRadius: moderateScale(10),
    backgroundColor: "#F0F0F0",
  },

  signupImage: {
    width: horizontalScale(260),
    height: verticalScale(180),
  },

  button: {
    width: "100%",
    position: "absolute",
    backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(50),
    bottom: verticalScale(32),
    alignSelf: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OtpScreen;
