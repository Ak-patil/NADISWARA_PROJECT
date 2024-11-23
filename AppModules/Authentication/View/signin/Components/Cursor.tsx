import * as React from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface CursorProps {
  x: Animated.SharedValue<number>;
  size: number;
  count: number;
}

export default function Cursor({ size, count, x }: CursorProps) {
  const offset = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx: any) => {
      const nextX = ctx.startX + event.translationX;
      x.value = Math.max(0, Math.min(nextX, (count - 1) * size));
    },
    onEnd: () => {
      const snapPoints = Array.from({ length: count }, (_, i) => i * size);
      const closestSnapPoint = snapPoints.reduce((prev, curr) =>
        Math.abs(curr - x.value) < Math.abs(prev - x.value) ? curr : prev
      );
      x.value = withSpring(closestSnapPoint);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "white",
            elevation: 5,
            justifyContent: "center",
            alignItems: "center",
          },
          animatedStyle,
        ]}
      />
    </PanGestureHandler>
  );
}
