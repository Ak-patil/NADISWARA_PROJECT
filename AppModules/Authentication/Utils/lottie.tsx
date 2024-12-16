import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface LottieAnimationProps {
  animationSource: object | number; // JSON object or require() path
  width?: number;
  height?: number;
  containerStyle?: StyleProp<ViewStyle>; // Style for the container View
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  animationSource,
  width = 220,
  height = 220,
  containerStyle,
}) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    // Start the animation when the component mounts
    animation.current?.play();
  }, []);

  return (
    <View style={[styles.animationContainer, containerStyle]}>
      <LottieView
        ref={animation}
        style={{
          width,
          height,
        }}
        source={animationSource}
      />
    </View>
  );
};

export default LottieAnimation;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
