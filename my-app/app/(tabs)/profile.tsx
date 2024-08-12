import { Image, StyleSheet, Pressable, Text  } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useNavigation } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';


const profile_page = () =>{
    const navigation = useNavigation();
    return(
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: 'pink' }}
        headerImage={
          <Image
            source={require('@/assets/images/mahiro.png')}
            style={styles.reactLogo}
          />
        }>



            <ThemedText type="subtitle"> Hope to see you soon!</ThemedText>
            <Pressable style={styles.button} 
            onPress={()=>{
                console.log("Clicked logout!");
                navigation.navigate('index');
            }}>
            <ThemedText type="default" style={{ color: 'black' }}>Logout</ThemedText>
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
      height: '100%',
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
    button: {
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
    },

  });


export default profile_page;
