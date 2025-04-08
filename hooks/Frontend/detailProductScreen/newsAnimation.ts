import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";

export function useNewsAnimation() {
  const { height } = Dimensions.get("window");
  const startPosition = height * 0.45;

  const translateY = useRef(new Animated.Value(startPosition)).current;
  const scrollText = useRef(new Animated.Value(0)).current;
  const lastOffset = useRef(startPosition);
  const [isTextScrolling, setIsTextScrolling] = useState(false);

  const startTextScroll = () => {
    setIsTextScrolling(true);
    scrollText.setValue(0);
    Animated.timing(scrollText, {
      toValue: -320,
      duration: 6000,
      useNativeDriver: true,
    }).start(() => {
      setIsTextScrolling(false);
      scrollText.setValue(0);
    });
  };

  const opacityBadgeHeader = translateY.interpolate({
    inputRange: [105, 120],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const opacityTitleHeader = translateY.interpolate({
    inputRange: [60, 90],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const opacityDescHeader = translateY.interpolate({
    inputRange: [30, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const opacityBadgeFloating = translateY.interpolate({
    inputRange: [105, 120],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const opacityTitleFloating = translateY.interpolate({
    inputRange: [60, 90],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const opacityDescFloating = translateY.interpolate({
    inputRange: [30, 50],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 5,

      onPanResponderGrant: () => {
        translateY.stopAnimation();
        translateY.setValue(lastOffset.current);
      },

      onPanResponderMove: (_, gesture) => {
        translateY.setValue(lastOffset.current + gesture.dy);
      },

      onPanResponderRelease: (_, gesture) => {
        let newPosition = lastOffset.current;

        if (gesture.dy < -100) {
          newPosition = 0;
        } else if (gesture.dy > 100) {
          newPosition = startPosition;
        }

        Animated.spring(translateY, {
          toValue: newPosition,
          useNativeDriver: true,
        }).start(() => {
          lastOffset.current = newPosition;
        });
      },
    })
  ).current;

  useEffect(() => {
    const listener = opacityTitleFloating.addListener(({ value }) => {
      if (value === 1 && !isTextScrolling) {
        startTextScroll();
      }
    });

    return () => {
      opacityTitleFloating.removeListener(listener);
    };
  }, [opacityTitleFloating, isTextScrolling]);

  return {
    translateY,
    scrollText,
    panResponder,
    isTextScrolling,
    opacityBadgeHeader,
    opacityTitleHeader,
    opacityDescHeader,
    opacityBadgeFloating,
    opacityTitleFloating,
    opacityDescFloating,
  };
}
