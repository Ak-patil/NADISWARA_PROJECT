import * as React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Cursor from "./Cursor";
import Labels from "./Labels";

const { width: totalWidth } = Dimensions.get("window");
const count = 5;
const width = totalWidth / count;
const height = width;

const styles = StyleSheet.create({
  container: {
    width: totalWidth,
    height,
    borderRadius: height / 2,
    overflow: "hidden",
  },
});

export default function Slider() {
  const x = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, width, 2 * width, 3 * width, 4 * width],
      ["transparent", "#fff9c4", "#fff176", "#fbc02d", "#ff8f00"] // Colors: Transparent -> Pale Yellow -> Yellow -> Dark Yellow -> Amber
    );

    return {
      width: withSpring(x.value + height),
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height,
            borderRadius: height / 2,
          },
          animatedStyle,
        ]}
      />
      <Labels size={height} {...{ x, count }} />
      <Cursor size={height} {...{ x, count }} />
    </View>
  );
}
