import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Dimensions, Platform, View} from 'react-native';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import StatusBar from '~/components/common/StatusBar';
import Orientation from 'react-native-orientation';
import {MovieType} from "~/types/Movie";
import Video from 'react-native-video';
import Container from "~/components/common/Container";
import {SharedElement, SharedElementsComponentConfig} from "react-navigation-shared-element";
import {HEIGHT, WIDTH} from "~/utils/dimensions";
import {NavigationProp} from "react-navigation-shared-element/src/types";


const Player = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Initial states
    // @ts-ignore
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // @ts-ignore
    const [paused, setPaused] = useState(false);

    // @ts-ignore
    const [hidePlayButton, setHidePlayButton] = useState(false);
    const [deviceOrientation, setDeviceOrientation] = useState('');

    const [orientationWidth, setOrientationWidth] = useState(0);
    const [orientationHeight, setOrientationHeight] = useState(0);
    const [landscapeMode, setLandscapeMode] = useState(false);

    const mPlayer = useRef<Video>(null);

    // Get passed Movie
    const movie: MovieType = navigation.getParam('movie');
    const {id, title, name} = movie;

    // Get local video file from asset
    const video = require('~/assets/videos/big_buck_bunny.mp4');


    // Listen to layout effect to perfomr some actions. (Use full for actions concerning screen orientation)
    useLayoutEffect(() => {
        Orientation.getOrientation((err: any, orientation: Orientation.orientation) => {
             console.log(err);
            setDeviceOrientation(orientation.toLowerCase());
            resizeVideoPlayer();
        });
        Orientation.addOrientationListener((orientation) => {
            setDeviceOrientation(orientation);
            resizeVideoPlayer();
        });
    });

    useEffect(() => {

    }, []);


    const handleLoad = ({duration: mediaDuration}: { duration: number }) => {
        setDuration(mediaDuration);
    };

    const handleProgress = ({currentTime: time}: { currentTime: number }) => {
        setCurrentTime(time);
    };

    const handleEnd = () => {
        setHidePlayButton(true);
        setCurrentTime(duration);
    };

    const resizeVideoPlayer = () => {
        let {width, height} = Dimensions.get('window');
        if (deviceOrientation == 'portrait' || deviceOrientation == 'portraitupsidedown') {
            setOrientationHeight(350);
            setOrientationWidth(width);
            setLandscapeMode(false);
        } else {
            setOrientationHeight(height);
            setOrientationWidth(width);
            setLandscapeMode(true);
        }
    };

    return (
        <SafeAreaProvider>
            <Container>
                <StatusBar/>
                <HeaderBack
                    landScapeMode={landscapeMode}
                    onPress={() => navigation.goBack()}
                    title={"Details"} subtitle={title ? title : name}/>
                <View style={{
                    flex: 1,
                    marginTop: landscapeMode ? 0 : 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SharedElement id={`item.${id}.video`}>
                        <Video
                            style={{
                                width: Platform.select({ios: orientationWidth, android: WIDTH}),
                                height: Platform.select({ios: orientationHeight, android: HEIGHT})
                            }}
                            ref={mPlayer}
                            source={video}
                            resizeMode={Platform.OS.toLowerCase() === 'android' ? 'contain' : 'contain'}
                            progressUpdateInterval={250}
                            controls={true}
                            paused={paused}
                            onLoad={handleLoad}
                            onProgress={handleProgress}
                            onEnd={handleEnd}
                        />
                    </SharedElement>
                </View>
            </Container>
        </SafeAreaProvider>
    )
};

const sharedElements: SharedElementsComponentConfig = (navigation: NavigationProp) => {
    const item: any = navigation.getParam();
    return [
        {
            id: `item.${item?.id}.video`,
            animation: 'fade'
        }
    ]
};

Player.sharedElements = sharedElements;
export default Player;
