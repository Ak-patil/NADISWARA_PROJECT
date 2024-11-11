import { ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SupportContact from "./SupportContact";
import ContactForm from "./ContactForm";
import { styles } from "../../Style/ContactScreenStyles/ContactMain.styles";
import { LinearGradient } from "expo-linear-gradient";
import CustomDrawerHeader from "../../../../BaseModule/Custom/CustomDrawerHeader";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
        <CustomDrawerHeader>Contact</CustomDrawerHeader>
        <ScrollView>
          <SupportContact />
          <ContactForm />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default ContactUs;
