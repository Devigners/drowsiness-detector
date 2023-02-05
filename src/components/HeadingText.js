import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
const HeadingText = ({ text }) => {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <View style={styles.contanier}>
        <Text style={[{ fontFamily: "Poppins_700Bold" }, styles.text]}>
          {text}
        </Text>
      </View>
    );
  }
};

export default HeadingText;

const styles = StyleSheet.create({
  text: {
    color: "black",
    justifyContent: "flex-start",
    fontSize: 30,
  },
  contanier: {
    margin: 30,
  },
});
