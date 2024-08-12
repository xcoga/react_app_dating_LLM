import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  withSpring
} from 'react-native-reanimated';

export function LoadingArrow(){
    const rotationAnimation = useSharedValue(0);

    rotationAnimation.value = withRepeat(
        withSequence(withTiming(360, { duration: 1000 })),
        -1, // Run the animation infinitely
    );
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }));
  
  
    return (
      <Animated.View style={animatedStyle}>
        <AntDesign name="loading1" size={24} color="white" />
      </Animated.View>
    );
  }
  
  const styles = StyleSheet.create({
    text: {
      fontSize: 28,
      lineHeight: 32,
      marginTop: -6,
    },
  });