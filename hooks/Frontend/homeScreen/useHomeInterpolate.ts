import { useRef, useState, useEffect } from "react";
import { Animated, useColorScheme } from "react-native";

export default function useHomeInterpolate(colorScheme: string) {
  const theme = useColorScheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const translateXIconCart = useRef(new Animated.Value(0)).current;
  const buttonCartWidth = useRef(new Animated.Value(60)).current;
  const [isTextVisible, setIsTextVisible] = useState(false);
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const textCartOpacity = useRef(new Animated.Value(0)).current;
  const fadeOutOpacity = useRef(new Animated.Value(1)).current;

  const fontSizeAnim = scrollY.interpolate({
    inputRange: [130, 140],
    outputRange: [32, 20],
    extrapolate: "clamp",
  });

  const floatingButtonCartOpacity = scrollY.interpolate({
    inputRange: [100, 130],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const textDecsOpacity = scrollY.interpolate({
    inputRange: [60, 70],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const textOpacity = scrollY.interpolate({
    inputRange: [0, 50, 50],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const searchOpacity = scrollY.interpolate({
    inputRange: [0, 90, 110],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  const searchScale = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 1],
    extrapolate: "clamp",
  });

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [140, 150],
    outputRange: [
      useColorScheme() === "dark" ? "rgba(19,21,20,0)" : "rgba(255,255,255,0)",
      useColorScheme() === "dark" ? "#131514" : "white",
    ],
    extrapolate: "clamp",
  }); 
  
  const headerBorderWidth = scrollY.interpolate({
    inputRange: [150, 160],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const headerTextOpacity = scrollY.interpolate({
    inputRange: [0, 49, 50],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const headerSearchOpacity = scrollY.interpolate({
    inputRange: [0, 110, 125],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const headerCategoryOpacity = scrollY.interpolate({
    inputRange: [0, 150, 170],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const CategoryOpacity = scrollY.interpolate({
    inputRange: [0, 150, 160],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });
    
    useEffect(() => {
      Animated.sequence([
        Animated.timing(fadeInOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(translateXIconCart, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(buttonCartWidth, {
            toValue: 150,
            duration: 500,
            useNativeDriver: false,
          }),
        ]),
      ]).start(() => {
        setIsTextVisible(true);
        Animated.timing(textCartOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
  
        setTimeout(() => {
          startExitAnimation();
        }, 2000);
      });
    }, []);
  
    const startExitAnimation = () => {
      Animated.timing(textCartOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setIsTextVisible(false);
        Animated.parallel([
          Animated.timing(buttonCartWidth, {
            toValue: 60,
            duration: 500,
            useNativeDriver: false,
          }),
          Animated.timing(translateXIconCart, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          Animated.timing(fadeOutOpacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        });
      });
    };

  return {
    scrollY,
    fontSizeAnim,
    textDecsOpacity,
    textOpacity,
    searchOpacity,
    searchScale,
    headerBackgroundColor,
    headerBorderWidth,
    headerTextOpacity,
    headerSearchOpacity,
    headerCategoryOpacity,
    CategoryOpacity,
    floatingButtonCartOpacity,
    translateXIconCart,
    buttonCartWidth,
    isTextVisible,
    textCartOpacity,
  };
}
