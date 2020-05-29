import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View,ScrollView, TouchableOpacity} from 'react-native';
import Container from '~/components/common/Container';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import StatusBar from '~/components/common/StatusBar';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import {Icon} from 'react-native-elements';
import {SharedElement} from "react-native-shared-element";
import {MovieType} from "~/types/Movie";
import styles from "~/screens/Detail/styles";

const Player = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    //const movie: MovieType = navigation.getParam('movie');
    const movie: MovieType = {
        id: 'xdtpWEDSFRlkjg-oikjhgd',
        title: 'Titre3',
        posterPath: require('~/assets/images/poster.jpeg'),
        releaseDate: '20-40-2009',
        description: 'Just an amazing movie3',
    };

    const {id} = movie;

    return (
        <SafeAreaProvider>
            <Container>
                <StatusBar/>
                <HeaderBack onPress={() => navigation.goBack()} title={"Details"} subtitle={"Episode title"}/>
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
