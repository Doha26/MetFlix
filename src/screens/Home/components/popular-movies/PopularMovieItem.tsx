import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import {SharedElement} from 'react-navigation-shared-element';
import styles from "~/screens/Home/components/popular-movies/styles";
import {useRessource} from "~/hooks/use-ressource";
import {WIDTH} from "~/utils/dimensions";

function PopularMovieItem({movie, navigation}: {
    movie: MovieType; navigation: NavigationScreenProp<any>;
}) {

    const {
        id,
        original_title,
        poster_path,
        overview,
    } = movie;

    const poster_image: string = useRessource({path: poster_path, size: 'w342'});

    return (
        <SharedElement id={`item.${id}.poster_path`}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7}
                                  onPress={() => navigation.navigate('detail', {'movie': movie})}
                                  style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={{
                            uri:
                                poster_image,
                            width: (WIDTH / 3) + 5, height: 1
                        }}
                    />
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
