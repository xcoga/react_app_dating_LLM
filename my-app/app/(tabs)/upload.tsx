import { useState } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { ThemedText } from '@/components/ThemedText';
import { LoadingArrow } from '@/components/LoadingArrow';

export default function ImagePickerExample() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const [sendingRequest,setSendingRequest] = useState(false)


  const uploadImage = async () => {

    //Check if user is currently sending a request to server already.
    //Prevent user from DDOSing the server
    if (sendingRequest == true){
      console.log("User tried to send concurrent requests. Terminated.")
      return;
    }
    else{
      setSendingRequest(true)
    }

    if (image == null) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);






    try {
      setLoading(true)
      const response = await axios.post('http://10.0.0.21:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        // timeout: 10000
      });

      navigation.navigate('analysis', { result: response.data.result });
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult('Failed to upload image');
    }

    finally{
      setLoading(false)
      setSendingRequest(false)
    }

  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //No cropping happens when allowsEditing is set False
      allowsEditing: false,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const cancelUpload = async () => {
    if (image == null) {return;}
    else {
      setImage(null);
      setUploadResult(null);

      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      {/* Row containing two buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <ThemedText type='default' style={{ color: 'black' }}>Pick Image</ThemedText >
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={cancelUpload}>
          <ThemedText type='default' style={{ color: 'black' }}>Cancel Image</ThemedText>
        </TouchableOpacity>

      </View>


      {loading && (<LoadingArrow/>)}



      <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <ThemedText type='default' style={{ color: 'black' }}>Upload Image</ThemedText>
      </TouchableOpacity>

      {uploadResult && <Text style={styles.text}>{uploadResult}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around', // Distribute space evenly
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    width: '100%', // Reduce the width further to ensure the borders are visible
    aspectRatio: 1, // Keeps the container square
    borderWidth: 3,
    borderColor: 'powderblue',
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50, // Match the border radius of the container
  },
  button: {
    backgroundColor: 'powderblue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row', // Align children horizontally
    justifyContent: 'space-between', // Distribute space between buttons
    width: '100%', // Adjust to control spacing
    marginVertical: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});