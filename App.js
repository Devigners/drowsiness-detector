import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

async function saveImage(uri, filename) {
  const image = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
  await FileSystem.writeAsStringAsync(
    `${FileSystem.documentDirectory}${filename}.jpg`,
    image,
    { encoding: FileSystem.EncodingType.Base64 }
  );
}

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let camera;

  const handleCapture = async () => {
    if (camera) {
      // const intervalId = setInterval(async () => {
      console.log("Taking picture...");
      let photo = await camera.takePictureAsync();
      saveImage(photo.uri, 'my-image');
      console.log("Picture taken:", photo);
        
      const response = await fetch('http://192.168.1.107:5000/video_frames', {
        method: 'POST',
        body: photo
      });
      const result = await response.json();
      // }, 500);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={ref => { camera = ref; }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={handleCapture}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Text style={{
                width: '100%',
                color: 'white', 
                textAlign: 'center', 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                padding: 10, 
                borderRadius: 10, 
                marginBottom: 50,
              }}>Start Detecting</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default App;