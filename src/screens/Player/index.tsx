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
    //const movie = navigation.getParam('movie');

    // Get local video file from asset
    const video = require('~/assets/videos/big_buck_bunny.mp4');

    //const movie: MovieType = navigation.getParam('movie');
    const movie: MovieType = {
        id: 'xdtpWEDSFRlkjg-oikjhgd',
        title: 'Titre3',
        posterPath: require('~/assets/images/poster.jpeg'),
        releaseDate: '20-40-2009',
        description: 'Just an amazing movie3',
    };

    const {id} = movie;

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
                    title={"Details"} subtitle={"Episode title"}/>
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
                            //resizeMode="stretch"
                            progressUpdateInterval={250}
                            controls={true}
                            paused={paused}
                            // seek={currentPosition}
                            onLoad={handleLoad}
                            onProgress={handleProgress}
                            // onSeek={({currentTime: time}: { currentTime: number }) => setCurrentTime(time)}
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
