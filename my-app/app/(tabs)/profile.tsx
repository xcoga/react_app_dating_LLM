import { Image, StyleSheet, Pressable, Text  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';


const profile_page = () =>{
    const navigation = useNavigation();
    return(
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
            <Pressable style={styles.button} 
            onPress={()=>{
                console.log("Clicked logout!");
                navigation.navigate('index');
            }}>
            <Text style={styles.buttonText}>Logout</Text>
            </Pressable>



        

        </ParallaxScrollView>
    );
}



const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    button: {
        backgroundColor: 'powderblue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },

  });


export default profile_page;
