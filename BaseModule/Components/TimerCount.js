import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../nadiswaraPro/Utils/Color";
import { moderateScale } from "../../nadiswaraPro/Utils/Metrics";

const TimerCount = ({ handleResendClick }) => {
  const [seconds, setSeconds] = useState(30);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setIsTimerCompleted(true);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const handleResendOTPClick = () => {
    setSeconds(30);
    setIsTimerCompleted(false);
    handleResendClick();
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={handleResendOTPClick}
        disabled={isTimerCompleted === false}
      >
        <Text
          style={[
            styles.resend,
            {
              color:
                isTimerCompleted === true
                  ? Colors.PRIMARY.PRIMARY_PURPLE
                  : "#48607770",
            },
          ]}
        >
          Resend Otp
        </Text>
      </TouchableOpacity>
      <Text
        style={{ textAlign: "center", fontSize: moderateScale(14) }}
      >{`${seconds}s`}</Text>
    </View>
  );
};

export default TimerCount;

const styles = StyleSheet.create({
  resend: {
    paddingRight: moderateScale(8),
    fontSize: moderateScale(14),
    textAlign: "right",
    fontFamily: "Urbanist-SemiBold",
    fontWeight: "500",
    marginBottom: 6,
  },
});
