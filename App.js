import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Home, Login } from "./src/screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_700Bold,
  });
  const Stack = createNativeStackNavigator();
  if (!fontsLoaded) return null;
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Drowsiness",
              headerTitleStyle: { fontFamily: "Poppins_700Bold" },
            }}
          ></Stack.Screen>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "Drowsiness",
              headerTitleStyle: { fontFamily: "Poppins_700Bold" },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
