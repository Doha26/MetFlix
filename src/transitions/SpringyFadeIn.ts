import {Animated} from 'react-native';

 function SpringyFadeIn() {
    const transitionSpec = {
        timing: Animated.spring,
        tension: 10,
        useNativeDriver: true,
    };
    return {
        transitionSpec,
        screenInterpolator: ({position, scene}:{position:any,scene:any}) => {
            const {index} = scene;
            const opacity = position.interpolate({
                inputRange: [index - 1, index],
                outputRange: [0, 1],
            });

            return {opacity};
        },
    };
}
export default SpringyFadeIn;
