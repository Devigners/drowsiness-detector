import React, { useState } from "react";
import {
  AuthTextInput,
  Block,
  HeadingText,
  PrimaryButton,
} from "../components";
import { Text } from "react-native";

const SignIn = ({ navigation }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    message: "",
    visible: false,
  });

  const handleChange = (name, value) => {
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <HeadingText text="Login" />
      <Block
        withoutScroll={true}
        paddingHorizontal={25}
        justifyContent="center"
      >
        <AuthTextInput
          name="Email"
          placeholder="Email"
          value={userData.email}
          onChangeText={(e) => handleChange("email", e)}
        />

        <AuthTextInput
          name="Lock"
          placeholder="Password"
          show={true}
          value={userData.password}
          onChangeText={(e) => handleChange("password", e)}
          secureTextEntry={true}
        />

        <PrimaryButton
          buttonHeading="Sign in"
          marginBottom={30}
          backgroundColor="#FD6250"
          onPress={() => navigation.navigate("Home")}
        />
      </Block>
    </>
  );
};
export default SignIn;
