import React from "react";
import { TextInput, StyleSheet, View, TouchableOpacity } from "react-native";
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
const AuthTextInput = ({ name, show, secureTextEntry, ...props }) => {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_400Regular,
  });
  if (!fontsLoaded) return null;
  else {
    return (
      <View style={styles.contanier}>
        <TextInput
          style={[styles.placeholder, { fontFamily: "Poppins_400Regular" }]}
          {...props}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
        />
      </View>
    );
  }
};
const styles = StyleSheet.create({
  contanier: {
    width: "100%",
    height: 55,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "##FD6250",
  },
  placeholder: {
    marginHorizontal: 15,

    flex: 1,
  },
});
export default AuthTextInput;
