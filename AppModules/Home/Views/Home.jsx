import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../../../BaseModule/Custom/Header";
import { horizontalScale } from "../../../nadiswaraPro/Utils/Metrics";
import { styles } from "../Style/HomeScreenStyles/HomeMainScreen.styles";

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Header />
        <View style={{ paddingHorizontal: horizontalScale(16) }}>
          <Text style={styles.text1}>Analyse Your Health</Text>
          <Text style={{ fontSize: 14, color: "#848484", paddingVertical: 4 }}>
            Understand your health better with simple steps.
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
            justifyContent: "space-between",
            borderWidth: 1,
            marginRight: 16,
            marginVertical: 16,
            height: "20%",
            borderTopRightRadius: moderateScale(20),
            borderBottomRightRadius: moderateScale(20),
          }}
        >
          <View style={{ borderWidth: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#fff",
                textAlign: "left",
              }}
            >
              Start with a sensor
            </Text>
          </View>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: "#fff",
              flex: 1,
              width: "100%",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "#fff",
                textAlign: "left",
              }}
            >
              Start with a sensor
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
            borderWidth: 1,
            marginLeft: 16,
            marginVertical: 16,
            height: "20%",
            borderTopLeftRadius: moderateScale(20),
            borderBottomLeftRadius: moderateScale(20),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#fff",
              textAlign: "left",
            }}
          >
            Start with a sensor
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Home;
