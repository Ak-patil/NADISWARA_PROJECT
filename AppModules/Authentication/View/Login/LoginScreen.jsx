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
import styles from "../../Style/SigninScreen.styles";

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import {
  Raleway_600SemiBold,
  Raleway_700Bold,
  useFonts,
} from "@expo-google-fonts/raleway";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginViaEmailRequest } from "../../Redux/Actions/AuthAction";
import { loginViaEmailStateSelector } from "../../Redux/Reducer/AuthSelector";

const Login = ({ navigation }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [userInfo, setUserInfo] = useState({
    email: "anandpatil676@gmail.com",
    password: "abcd1234",
  });
  const [error, setError] = useState({
    password: "",
  });
  const [required, setRequired] = useState("");
  const dispatch = useDispatch();

  const loginViaEmailState = useSelector((state) =>
    loginViaEmailStateSelector(state)
  );

  const handleSignIn = async () => {
    if (userInfo.email && userInfo.password) {
      setRequired("");
      dispatch(
        loginViaEmailRequest({
          email_or_phone: userInfo.email,
          password: userInfo.password,
        })
      );
    } else {
      setRequired("Fill Up The All Required Field");
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

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: "center" }}>
        <Image
          style={styles.signInImage}
          source={require("../../../../assets/OOHY_LOGO.png")}
        />
        <Card mode="elevated" style={styles.card}>
          <Text style={styles.login}>Login</Text>
          <Text style={styles.loginToYour}>
            Login to your existing account using your email and password.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              label="Email"
              style={styles.input}
              keyboardType="email-address"
              value={userInfo.email}
              onChangeText={(value) =>
                setUserInfo({ ...userInfo, email: value })
              }
            />
            {required && (
              <View style={styles.errorContainer}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={styles.errorText}>{required}</Text>
              </View>
            )}
            <View>
              <TextInput
                label="Password"
                style={styles.input}
                secureTextEntry={!isPasswordVisible}
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
            </View>

            {error.password && (
              <View style={styles.errorContainer2}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={styles.errorText2}>{error.password}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("Forgot Password")}
          >
            <Text style={styles.forgotSection}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleSignIn}
          >
            {loginViaEmailState?.isLoading ? (
              <ActivityIndicator size={"small"} color={"white"} />
            ) : (
              <Text
                style={[styles.buttonText, { fontFamily: "Raleway_700Bold" }]}
              >
                Login
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainerGoogle}
            onPress={handleSignIn}
          >
            <Text style={styles.buttonTextGoogle}>Continue with google</Text>
          </TouchableOpacity>
          <View style={styles.signupRedirect}>
            <Text
              style={[
                styles.signupTextStyle,
                { fontFamily: "Raleway_600SemiBold" },
              ]}
            >
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={[
                  styles.signupText,
                  { fontFamily: "Raleway_600SemiBold" },
                ]}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
};

export default Login;
