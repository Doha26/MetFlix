import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Dimensions, View} from 'react-native';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import StatusBar from '~/components/common/StatusBar';
import Orientation from 'react-native-orientation';
import {MovieType} from "~/types/Movie";
import Video from 'react-native-video';
import Container from "~/components/common/Container";
import Colors from "~/theming/colors";
import {SharedElement} from "react-native-shared-element";


const Player = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Initial states
    const [currentTime, setCurrentTime] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hidePlayButton, setHidePlayButton] = useState(false);
    const [deviceOrientation, setDeviceOrientation] = useState('');

    const [orientationWidth, setOrientationWidth] = useState(0);
    const [orientationHeight, setOrientationHeight] = useState(0);
    const [landscapeMode, setLandscapeMode] = useState(false);

    const mPlayer = useRef<Video>(null);

    // Get passed Movie
    const movie: MovieType = navigation.getParam('movie');

    // Get local video file from asset
    const video = require('~/assets/videos/big_buck_bunny.mp4');

    const {id} = movie;

    // Listen to layout effect to perfomr some actions. (Use full for actions concerning screen orientation)
    useLayoutEffect(() => {
        Orientation.getOrientation((err: any, orientation: Orientation.orientation) => {
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
                    title={"Details"} subtitle={movie.title ? movie.title : movie.name}/>
                <View style={{
                    flex: 1,
                    marginTop: landscapeMode ? 0 : 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <SharedElement id={`item.${id}.video`}>
                        <Video
                            style={{width: orientationWidth, height: orientationHeight}}
                            ref={mPlayer}
                            source={video}
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

Player.sharedElements = (navigation: NavigationScreenProp<any>) => {
    const item = navigation.getParam('movie');
    return [
        {
            id: `item.${item.id}.video`,
            animation: 'fade'
        }
    ]
};

export default Player;
