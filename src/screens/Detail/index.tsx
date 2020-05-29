import React from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import Container from '~/components/common/Container';
import HeaderBack from '~/components/common/header-back';
import {NavigationScreenProp} from 'react-navigation';
import StatusBar from '~/components/common/StatusBar';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import BlackOverlay from '~/components/common/Overlay';
import {Icon} from 'react-native-elements';
import {SharedElement} from "react-native-shared-element";
import {MovieType} from "~/types/Movie";
import styles from "~/screens/Detail/styles";

const Detail = ({navigation}: { navigation: NavigationScreenProp<any> }) => {

    const movie: MovieType = navigation.getParam('movie');
    const {id} = movie;

    return (
        <SafeAreaProvider>
            <Container>
                <SharedElement id={`item.${id}.posterPath`}>
                    <View style={styles.container}>
                        <View style={styles.imageWrapper}>
                            <Image
                                style={styles.image}
                                source={require('~/assets/images/poster.jpeg')}
                            />

                        </View>
                    </View>
                </SharedElement>
                <StatusBar/>
                <BlackOverlay/>
                <HeaderBack onPress={() => navigation.pop()}/>
                <TouchableOpacity style={styles.playerButton} activeOpacity={0.7}>
                    <Icon type={'antdesign'} size={26} color={Colors.white}
                          name={'caretright'}/>
                </TouchableOpacity>
                <View
                    style={styles.detailsWraper}>
                    <SharedElement id={`item.${id}.title`}>
                        <Text
                            extraLarge
                            numberOfLines={1}
                            style={styles.titleStyle}
                        >
                            Category
                        </Text>
                    </SharedElement>

                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={styles.subTitleStyle}>
                        subtitle
                    </Text>
                    <ScrollView showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}>
                        <Text small style={styles.descriptionStyle}>
                            sample description sample description sample
                        </Text>
                    </ScrollView>

                </View>
            </Container>
        </SafeAreaProvider>
    )
};

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
