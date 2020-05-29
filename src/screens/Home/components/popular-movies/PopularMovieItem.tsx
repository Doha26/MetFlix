import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {Image, TouchableOpacity, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import {SharedElement} from 'react-navigation-shared-element';
import styles from "~/screens/Home/components/popular-movies/styles";

function PopularMovieItem({movie, navigation}: {
    movie: MovieType; navigation: NavigationScreenProp<any>;
}) {

    const {
        id,
        title,
        posterPath,
        description,
    } = movie;

    return (
        <SharedElement id={`item.${id}.posterPath`}>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => navigation.navigate('detail', {'movie': movie})}
                    style={styles.imageWrapper}>
                    <Image
                        style={styles.image}
                        source={posterPath}
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
                                {title}
                            </Text>
                        </SharedElement>
                        <Text small style={styles.subtitleStyle}>
                            {description}
                        </Text>
                    </LinearGradient>

                </TouchableOpacity>
            </View>
        </SharedElement>
    );
}

export default withNavigation(PopularMovieItem);
