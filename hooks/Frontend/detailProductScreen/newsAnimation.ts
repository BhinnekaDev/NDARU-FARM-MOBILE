import { useEffect, useRef, useState} from "react";
import { Animated, Dimensions, PanResponder, ScrollView } from "react-native";

export function useNewsAnimation() {
  const { height } = Dimensions.get("window");
  const startPosition = height * 0.45;
  const translateY = useRef(new Animated.Value(startPosition)).current;
  const lastOffset = useRef(startPosition);
  const AnimInFloating = useRef(new Animated.Value(400)).current;
  const maxPosition = 800;
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [isScrollAtTop, setIsScrollAtTop] = useState(true);

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
      onMoveShouldSetPanResponder: (_, gesture) => {
        return isScrollAtTop && Math.abs(gesture.dy) > 0;
      },
  
      onPanResponderGrant: () => {
        translateY.stopAnimation();
        translateY.setValue(lastOffset.current);
      },
  
      onPanResponderMove: (_, gesture) => {
        let newY = lastOffset.current + gesture.dy;
  
        if (newY < 0) newY = 0;
        if (newY > maxPosition) newY = maxPosition;
  
        setScrollEnabled(newY <= 10);
  
        translateY.setValue(newY);
      },
  
      onPanResponderRelease: (_, gesture) => {
        let newPosition = lastOffset.current;
  
        if (gesture.dy < -50) {
          newPosition = 0;
        } else if (gesture.dy > 50) {
          newPosition = startPosition;
        }
  
        if (newPosition < 0) newPosition = 0;
        if (newPosition > maxPosition) newPosition = maxPosition;
  
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
    const listener = translateY.addListener(({ value }) => {
      setScrollEnabled(value === 0);
    });

    return () => {
      translateY.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    Animated.timing(AnimInFloating, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return {
    AnimInFloating,
    translateY,
    panResponder,
    scrollEnabled,
    setScrollEnabled,
    startPosition,
    lastOffset, 
    setIsScrollAtTop,
    opacityBadgeHeader,
    opacityTitleHeader,
    opacityDescHeader,
    opacityBadgeFloating,
    opacityTitleFloating,
    opacityDescFloating,
  };
}
