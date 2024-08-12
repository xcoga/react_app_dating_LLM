import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRoute } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Collapsible } from '@/components/Collapsible';
import { ThemedView } from '@/components/ThemedView';

export default function ResultScreen() {
  const route = useRoute();
  const { result } = route.params || {};


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bg_2.jpg')}
          style={styles.headerImage}
        />
      }>

    <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AI analysis results</ThemedText>
    </ThemedView>

    <Collapsible title="Texting content suggestions! (Click me)">
      <ThemedText type="default">{result ? result[0] : 'Please upload image...'}</ThemedText>
    </Collapsible>

    <Collapsible title="Texting style suggestions! (Click me)">
      <ThemedText type="default">{result ? result[1] : 'Please upload image...'}</ThemedText> 
    </Collapsible>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 18,
    color: 'white',
  },
  headerImage: {
    position: 'absolute', // Positioned absolutely within the container
    resizeMode: 'cover', 
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
