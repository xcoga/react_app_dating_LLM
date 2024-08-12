import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the navigation object
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
    'Moonbright': require('@/assets/fonts/Moonbright.ttf'),
    'SpaceMono': require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <ImageBackground
      source={require('../assets/images/bg_1.jpg')} // Replace with your image path
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={new_username => setUsername(new_username)}
          defaultValue={username}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true} 
          placeholder="Password"
          onChangeText={(new_password)=>setPassword(new_password)}
          defaultValue={password}
        />


        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('You tapped the login button!'); 
            if (check_user_if_admin(username,password)){
              console.log("User is admin")
              //Not sure why VScode says this is an error. It is correct & works.
              navigation.navigate('(tabs)', { screen: 'home' });
              setUsername('')
              setPassword('')
            }else{
              console.log("Wrong user.")
            }

          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

function check_user_if_admin(username:string,password:string): boolean {
    if (username == 'admin' && password == '123'){
        return true;
    }
    else{
        return false;
    }

}


const styles = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,   
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'powderblue',
    height: 50,
    width:200,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 50,
    marginBottom: 10,
    fontSize: 20,
    fontFamily: 'SpaceMono',
  },
  button: {
    backgroundColor: 'powderblue',
    padding: 10,
    height: 60,
    width: 120,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Moonbright',
    fontSize: 30,
  },
});

export default LoginScreen;
