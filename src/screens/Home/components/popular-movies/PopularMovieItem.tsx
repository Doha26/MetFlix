import React, {Suspense} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {ActivityIndicator, Dimensions, Image, Platform, TouchableOpacity, View} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import {SharedElement} from 'react-navigation-shared-element';
import styles from "~/screens/Home/components/popular-movies/styles";
import {useRessource} from "~/hooks/use-ressource";
import {HEIGHT, WIDTH} from "~/utils/dimensions";

function PopularMovieItem({movie, navigation}: {
    movie: MovieType; navigation: NavigationScreenProp<any>;
}) {

    const {
        id,
        original_title,
        poster_path,
        overview,
    } = movie;

    //Get the poster_image of the current item
    const poster_image: string = useRessource({path: poster_path, size: 'w342'});

    // Use React Lazy loading to load images : usefull for slow network and big ressources sized
    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));

    return (
        <SharedElement id={`item.${id}.poster_path`}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7}
                                  onPress={() => navigation.navigate('detail', {'movie': movie})}
                                  style={styles.imageWrapper}>

                    <Suspense fallback={
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator
                                color={Colors.white}
                                style={{marginVertical: Platform.OS === 'ios' ? 10 : 0}}
                                size={Platform.OS === 'ios' ? 1 : 24}
                            />
                        </View>
                    }>
                        <LazyImage image={poster_image} style={styles.image} width={(WIDTH / 3) + 5} height={1}/>
                    </Suspense>

                    <LinearGradient
                        locations={[0.1, 0.1, 1]}
                        colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
                        <SharedElement id={`item.${id}.title`}>
                            <Text
                                extraLarge
                                numberOfLines={1}
                                style={styles.titleStyle}
                            >
                                {original_title}
                            </Text>
                        </SharedElement>
                        <Text numberOfLines={2} small style={styles.subtitleStyle}>
                            {overview}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SharedElement>
    );
}

export default withNavigation(PopularMovieItem);
