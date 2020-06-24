import React, {Suspense} from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {View, ActivityIndicator, Platform, GestureResponderEvent} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import styles from "~/screens/Home/components/popular-tv/style";
import {useRessource} from "~/hooks/use-ressource";
import {WIDTH} from "~/utils/dimensions";
import {SharedElement} from "react-navigation-shared-element";
import TouchableWithPopup from "~/components/common/touchable";

function PopularTvItem({movie, navigation, onLongPress}: {
    movie: MovieType; navigation: NavigationScreenProp<any>; onLongPress: (event: GestureResponderEvent) => void
}) {

    const {
        id,
        name,
        poster_path,
        overview,
    } = movie;

    //Get the poster_image of the current item
    const poster_image: string = useRessource({path: poster_path, size: 'w342'});

    // Use React Lazy loading to load images : usefull for slow network and big ressources sized
    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));


    return (
        <View style={styles.container}>
            <TouchableWithPopup
                onLongPress={onLongPress}
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
                            {name}
                        </Text>
                    </SharedElement>
                    <Text numberOfLines={2} small style={styles.subtitleStyle}>
                        {overview}
                    </Text>
                </LinearGradient>
            </TouchableWithPopup>
        </View>
    );
}

export default withNavigation(PopularTvItem);
