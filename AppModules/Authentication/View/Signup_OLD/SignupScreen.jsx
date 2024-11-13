import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { appendObjectToForm } from "../../../../BaseModule/Utils/helpers";
import { signupViaEmailRequest } from "../../Redux/Actions/AuthAction";
import { signupViaEmailStateSelector } from "../../Redux/Reducer/AuthSelector";
import styles from "../../Style/RegisterScreen.styles";

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isButtonSpinner, setButtonSpinner] = useState(false);

  const signupViaEmailState = useSelector((state) =>
    signupViaEmailStateSelector(state)
  );

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [required, setRequired] = useState("");

  const handleRegister = async () => {
    setButtonSpinner(true);
    if (userInfo.email && userInfo.password && userInfo.confirmPassword) {
      setRequired("");

      if (userInfo.password !== userInfo.confirmPassword) {
        setError({ ...error, confirmPassword: "Passwords do not match" });
        setButtonSpinner(false);
        return;
      }

      const userData = {
        "email/phone_number": userInfo.email,
        password1: userInfo.password,
        password2: userInfo.confirmPassword,
      };
      const updatedForm = appendObjectToForm(userData);

      dispatch(signupViaEmailRequest(updatedForm));
    } else {
      setRequired("Fill Up The All Required Fields");
      setButtonSpinner(false);
    }
  };

  const handleEmailValidation = (value) => {
    const email = value;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      setError({ ...error, email: "Invalid Email" });
      setUserInfo({ ...userInfo, email: "" });
    } else {
      setError({ ...error, email: "" });
      setUserInfo({ ...userInfo, email: value });
    }
  };

  const handlePasswordValidation = (value) => {
    const password = value;

    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleConfirmPasswordValidation = (value) => {
    const confirmPassword = value;

    if (confirmPassword !== userInfo.password) {
      setError({
        ...error,
        confirmPassword: "Passwords do not match",
      });
    } else {
      setError({
        ...error,
        confirmPassword: "",
      });
      setUserInfo({ ...userInfo, confirmPassword: value });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={styles.signupImage}
          source={require("../../../../assets/OOHY_LOGO.png")}
        />
        <Card mode="elevated" style={styles.card}>
          <Text
            style={[styles.getStartedText, { fontFamily: "Raleway_700Bold" }]}
          >
            Signup
          </Text>
          <Text
            style={[
              styles.accountCreateText,
              { fontFamily: "Nunito_400Regular" },
            ]}
          >
            Sign up for your account using your email or phone number along with
            a password.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email Address"
              onChangeText={handleEmailValidation}
            />
            {error.email && (
              <View style={styles.errorContainer1}>
                <Entypo name="cross" size={24} color={"red"} />
                <Text style={styles.errorText1}>{error.email}</Text>
              </View>
            )}

            <View>
              <TextInput
                style={styles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                placeholder="Password"
                onChangeText={handlePasswordValidation}
              />
              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={23}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={23} color={"#747474"} />
                )}
              </TouchableOpacity>
              {error.password && (
                <View style={styles.errorContainer1}>
                  <Entypo name="cross" size={24} color={"red"} />
                  <Text style={styles.errorText1}>{error.password}</Text>
                </View>
              )}
            </View>

            <View>
              <TextInput
                style={styles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                placeholder="Confirm Password"
                onChangeText={handleConfirmPasswordValidation}
              />
              {error.confirmPassword && (
                <View style={styles.errorContainer1}>
                  <Entypo name="cross" size={24} color={"red"} />
                  <Text style={styles.errorText1}>{error.confirmPassword}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleRegister}
            >
              {signupViaEmailState?.isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text
                  style={[styles.buttonText, { fontFamily: "Raleway_700Bold" }]}
                >
                  Sign up
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainerGoogle}>
              {signupViaEmailState?.isLoading ? (
                <ActivityIndicator size={"small"} color={"white"} />
              ) : (
                <Text style={styles.buttonTextGoogle}>
                  Continue with google
                </Text>
              )}
            </TouchableOpacity>

            <View style={styles.signupRedirect}>
              <Text
                style={[
                  styles.signupTextStyle,
                  { fontFamily: "Raleway_600SemiBold" },
                ]}
              >
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("signin")}>
                <Text
                  style={[
                    styles.signupTextStyle,
                    { fontFamily: "Raleway_600SemiBold" },
                    styles.signupText,
                  ]}
                >
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
