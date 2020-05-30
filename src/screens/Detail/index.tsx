import React, {Suspense, useLayoutEffect, useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Dimensions} from 'react-native';
import Container from '~/components/common/Container';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import BlackOverlay from '~/components/common/Overlay';
import {Icon} from 'react-native-elements';
import {SharedElement} from "react-native-shared-element";
import {MovieType} from "~/types/Movie";
import styles from "~/screens/Detail/styles";
import {useRessource} from "~/hooks/use-ressource";
import {HEIGHT, WIDTH} from "~/utils/dimensions";
import Orientation from "react-native-orientation";

const Detail = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // States initialisation
    const [deviceOrientation, setDeviceOrientation] = useState('');
    const [orientationWidth, setOrientationWidth] = useState(0);
    const [orientationHeight, setOrientationHeight] = useState(0);

    // Getting passed data from navigation
    const movie: MovieType = navigation.getParam('movie');

    const {id} = movie; // Destructuring the Movie Object to get the id poperty
    const poster_image: string = useRessource({path: movie.poster_path, size: 'w500'});

    // Lazy loading the background image
    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));

    // Listen to layout effect to perfomr some actions. (Use full for actions concerning screen orientation)
    useLayoutEffect(() => {
        Orientation.getOrientation((err: any, orientation: Orientation.orientation) => {
            setDeviceOrientation(orientation.toLowerCase());
            updateScreenDimensions();
        });
        Orientation.addOrientationListener((orientation) => {
            setDeviceOrientation(orientation);
            updateScreenDimensions();
        });
    });

    const updateScreenDimensions = () => {
        let {width, height} = Dimensions.get('window');
        if (deviceOrientation == 'portrait' || deviceOrientation == 'portraitupsidedown') {
            setOrientationHeight(350);
            setOrientationWidth(width);
        } else {
            setOrientationHeight(height);
            setOrientationWidth(width);
        }
    };


    return (
        <SafeAreaProvider>
            <Container>
                <SharedElement id={`item.${id}.posterPath`}>
                    <View style={Object.assign({},styles.container,{ width: WIDTH, height: HEIGHT})}>
                        <View style={Object.assign({},styles.imageWrapper,{width: WIDTH, height: HEIGHT})}>
                            <Suspense fallback={
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <ActivityIndicator
                                        color={Colors.white}
                                        style={{marginVertical: Platform.OS === 'ios' ? 10 : 0}}
                                        size={Platform.OS === 'ios' ? 1 : 24}
                                    /></View>}>
                                <LazyImage image={poster_image} style={styles.image} width={WIDTH} height={HEIGHT}/>
                            </Suspense>
                        </View>
                    </View>
                </SharedElement>
                <BlackOverlay/>
                <HeaderBack onPress={() => navigation.goBack()} title={"Details"}/>

                <TouchableOpacity style={styles.playerButton} activeOpacity={0.7}
                                  onPress={() => navigation.navigate('player', {movie: movie})}>
                    <SharedElement id={`item.${id}.video`}>
                        <Icon type={'antdesign'} size={26} color={Colors.white}
                              name={'caretright'}/>
                    </SharedElement>
                </TouchableOpacity>

                <View
                    style={styles.detailsWraper}>
                    <SharedElement id={`item.${id}.title`}>
                        <Text
                            extraLarge
                            numberOfLines={1}
                            style={styles.titleStyle}>
                            {movie.title ? movie.title : movie.name}
                        </Text>
                    </SharedElement>

                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={styles.subTitleStyle}>
                        {`Released on ${movie.release_date ? movie.release_date : movie.first_air_date}`}
                    </Text>
                    <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                        <Text small style={styles.descriptionStyle}>
                            {movie.overview}
                        </Text>
                    </ScrollView>

                </View>
            </Container>
        </SafeAreaProvider>
    )
};

// Add custom config for shared element transitions items
Detail.sharedElements = (navigation: NavigationScreenProp<any>) => {
    const item = navigation.getParam('movie');
    return [
        {
            id: `item.${item.id}.posterPath`,
            animation: 'fade'
        },
        {
            id: `item.${item.id}.title`,
            animation: 'fade'
        }];
};

export default Detail;
