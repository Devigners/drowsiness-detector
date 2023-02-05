import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Camera } from "expo-camera";
import * as FileSystem from "expo-file-system";
import { HeadingText } from "../components";

async function saveImage(uri, filename) {
  const image = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  await FileSystem.writeAsStringAsync(
    `${FileSystem.documentDirectory}${filename}.jpg`,
    image,
    { encoding: FileSystem.EncodingType.Base64 }
  );
}

const Home = () => {
  const [isDectacting, setIsDectacting] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [personStatus, setPersonStatus] = useState();

  let camera = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  useEffect(() => {
    if (camera) {
      const intervalId = setInterval(async () => {
        if (isDectacting && camera) {
          console.log("Taking picture...");
          let options = {
            quality: 1,
            base64: true,
            exif: true,
          };
          let photo = await camera.current.takePictureAsync(options);
          console.log(photo.uri);

          saveImage(photo.uri, "my-image");
          setSelectedImage(photo.uri);
          uploadImage()
            .then(() => {})
            .catch((err) => console.log(err));
        }
      }, 5000);
    }
    return () => {};
  }, [isDectacting]);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "selectedImage.jpg",
      type: "image/jpeg",
    });

    try {
      let response = await fetch("<API URL>/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      let responseJson = await response.json();
      console.log(responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        ref={camera}
        type={type}
        onCameraReady={() => {
          console.log("camera is ready");
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignSelf: "flex-end",

              padding: 20,
              backgroundColor: "#FD6250",
              borderRadius: 30,
              margin: 20,
            }}
            onPress={() => setIsDectacting(true)}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Poppins_400Regular",
              }}
            >
              Start Detecting
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default Home;
