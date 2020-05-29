import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {MovieType} from '~/types/Movie';
import {TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import styles from "~/screens/Home/components/styles";
import useFetch from "~/hooks/use-fetch";
import {useRessource} from "~/hooks/use-ressource";
import {WIDTH} from "~/utils/dimensions";


function Poster({movie, navigation: {navigate}}: { movie: MovieType; navigation: NavigationScreenProp<any> }) {

    const {response, loading} = useFetch({path: 'movie/top_rated'});
    const {results: data} = response || {};

    // Get a random integer between O and 20;
    const random_number = Math.floor(Math.random() * 20);

    // Get the movie on the list at this index and use it as a Poster
    const top_rated_movie: any = (data != null && data != undefined) ? data[random_number] : null;

    let rendered: any = null;

    if (top_rated_movie) {
        const {
            original_title,
            poster_path,
            overview,
        } = top_rated_movie;

        const poster_image: string = useRessource({path: poster_path, size: 'w342'});

        rendered = (
            <TouchableOpacity onPress={() => console.log(1)} style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    source={{
                        uri: poster_image,
                        width:WIDTH
                    }}
                />
                <LinearGradient
                    locations={[0.1, 0.1, 1]}
                    colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
                    <Text small numberOfLines={2} style={{color: Colors.white, fontWeight: '400'}}>
                        {overview}
                    </Text>
                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
                    >
                        {original_title}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    } else {
        rendered = (
            <TouchableOpacity onPress={() => console.log(1)} style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    source={require('~/assets/images/poster.jpeg')}
                />
                <LinearGradient
                    locations={[0.1, 0.1, 1]}
                    colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
                    <Text small numberOfLines={2} style={{color: Colors.white, fontWeight: '400'}}>
                        Title
                    </Text>
                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
                    >
                        Just amazing movie
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }


    // @ts-ignore
    return (
        <View style={styles.container}>
            {rendered}
        </View>
    );
}


export default withNavigation(Poster);
