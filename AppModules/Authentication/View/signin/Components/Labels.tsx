import * as React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

interface LabelProps {
  x: Animated.SharedValue<number>;
  count: number;
  size: number;
}

export default function Labels({ count, x, size }: LabelProps) {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {new Array(count).fill(0).map((_, i) => {
        const animatedStyle = useAnimatedStyle(() => ({
          color: interpolateColor(
            x.value / size,
            [i - 0.5, i, i + 0.5],
            ["gray", "white", "gray"]
          ),
        }));

        return (
          <View key={i} style={{ flex: 1 }}>
            <Animated.Text
              style={[{ textAlign: "center", fontSize: 24 }, animatedStyle]}
            >
              {/* {`${i + 1}`} */}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
}
