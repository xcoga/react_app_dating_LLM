import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [uploadResult, setUploadResult] = useState<string | null>(null);


  const uploadImage = async () => {
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
      //TODO fill in the IP after we create our Flask App
      const response = await axios.post('http://10.0.0.21:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadResult(response.data.result);
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult('Failed to upload image');
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //No cropping happens when allowsEditing is set False
      allowsEditing: false,
    //   aspect: [5, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload Image" onPress={uploadImage} />
      {uploadResult && <Text style={styles.Text}>{uploadResult}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  Text: {
    marginTop: 20,
    fontSize: 16,
    color: 'green',
  },
});
