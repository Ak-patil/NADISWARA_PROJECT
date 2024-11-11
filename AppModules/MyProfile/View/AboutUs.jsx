import React, { useEffect, useState } from "react";
import { styles } from "../Style/AboutScreenStyles/AboutMain.styles";
import { LinearGradient } from "expo-linear-gradient";
import CustomDrawerHeader from "../../../BaseModule/Custom/CustomDrawerHeader";

const AboutUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
        <CustomDrawerHeader>About</CustomDrawerHeader>
      </LinearGradient>
    </>
  );
};

export default AboutUs;
