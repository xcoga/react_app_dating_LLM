import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Get the navigation object
  const navigation = useNavigation();


  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={new_username => setUsername(new_username)}
        defaultValue={username}
      />
      <TextInput
        style={styles.input}
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
  input: {
    backgroundColor: 'white',
    borderColor: 'powderblue',
    height: 40,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'powderblue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default LoginScreen;
