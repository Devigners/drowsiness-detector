import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";

const PrimaryButton = ({
  buttonHeading,
  onPress,
  backgroundColor,
  margin,
  borderWidth,
  borderColor,
  marginTop,
  marginBottom,
}) => {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.contanier,
          {
            backgroundColor: backgroundColor,
            margin: margin || 0,
            borderWidth: borderWidth || 0,
            borderColor: borderColor || "",
            marginTop: marginTop || 0,
            marginBottom: marginBottom ?? 50,
          },
        ]}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Text style={[styles.text, { fontFamily: "Poppins_700Bold" }]}>
          {buttonHeading}
        </Text>
      </TouchableOpacity>
    );
  }
};
const styles = StyleSheet.create({
  contanier: {
    marginTop: 10,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
  },
});
export default PrimaryButton;
