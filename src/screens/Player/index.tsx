import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Dimensions, View} from 'react-native';
import Container from '~/components/common/Container';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import StatusBar from '~/components/common/StatusBar';
import Orientation from 'react-native-orientation';
import {MovieType} from "~/types/Movie";
import MediaPlayer from "~/components/media-player";
import Video from 'react-native-video';
import Colors from '~/theming/colors';

const {width, height} = Dimensions.get('window');


const Player = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    // Initial states
    const [currentTime, setCurrentTime] = useState(0);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hidePlayButton, setHidePlayButton] = useState(false);
    const [deviceOrientation, setDeviceOrientation] = useState('');


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

    useEffect(() => {
        //Orientation.lockToLandscape();

        // Detect screen rotation to change video sizeMode
        Orientation.getOrientation((err: any, orientation: Orientation.orientation) => {
            //setDeviceOrientation(orientation)
        });
        Orientation.addOrientationListener((orientation) => {
           // setDeviceOrientation(orientation)

        });
    }, []);


    const handleLoad = ({duration: mediaDuration}: { duration: number }) => {
        setDuration(mediaDuration);
    };

    const handleProgress = ({currentTime: time}: { currentTime: number }) => {
        setCurrentTime(time);
    };

    const handleChangePosition = (position: number) => {
        if (hidePlayButton) setHidePlayButton(false);

        setCurrentTime(position);
        setCurrentPosition(position);
    };

    const handleEnd = () => {
        setHidePlayButton(true);
        setCurrentTime(duration);
    };

    const setVideoResizeMode: any = () => {
        return (deviceOrientation.toLowerCase() == 'portrait' || deviceOrientation.toLowerCase() == 'portraitupsidedown') ? 'contain' : 'cover'
    };

    return (
        <SafeAreaProvider>
            <Container>
                <StatusBar/>
                <HeaderBack onPress={() => navigation.goBack()} title={"Details"} subtitle={"Episode title"}/>
                <Video
                    source={video}
                    style={{flex: 1, height: height, width: width}}
                    resizeMode="stretch"
                    progressUpdateInterval={250}
                    paused={paused}
                    // seek={currentPosition}
                    onLoad={handleLoad}
                    onProgress={handleProgress}
                    // onSeek={({currentTime: time}: { currentTime: number }) => setCurrentTime(time)}
                    onEnd={handleEnd}
                />
                <MediaPlayer
                    title={movie.title}
                    currentPosition={currentTime}
                    duration={duration}
                    paused={paused}
                    hidePlayButton={hidePlayButton}
                    onBack={() => navigation.goBack()}
                    onPause={pause => setPaused(pause)}
                    onChangePosition={handleChangePosition}
                />
            </Container>
        </SafeAreaProvider>
    )
};

Player.sharedElements = (navigation: NavigationScreenProp<any>) => {
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

export default Player;
