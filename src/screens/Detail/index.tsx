import React, {Suspense} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform} from 'react-native';
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

const Detail = ({navigation}: { navigation: NavigationScreenProp<any> }) => {


    const movie: MovieType = navigation.getParam('movie');
    const {id} = movie; // Destructuring the Movie Object to get the id poperty
    const poster_image: string = useRessource({path: movie.poster_path, size: 'w500'});

    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));


    return (
        <SafeAreaProvider>
            <Container>
                <SharedElement id={`item.${id}.posterPath`}>
                    <View style={styles.container}>
                        <View style={styles.imageWrapper}>
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
