import {ActivityIndicator, Platform, TouchableOpacity, View} from "react-native";
import React, {Suspense} from "react";
import Colors from "~/theming/colors";
import Text from "~/components/common/Text";
import {Icon, Rating} from "react-native-elements";
import styles from "~/screens/Home/components/search-results/search-result-tem/styles";
import {MovieType} from "~/types/Movie";
import {NavigationScreenProp} from "react-navigation";
import {useRessource} from "~/hooks/use-ressource";

// destructuring styles
const {itemRow, titleStyle, imageWrapper, image, detailWrapper, itemStat, subtitleStyle, ratingContainer} = styles;


const  SearchResultItem = ({movie, navigation}: {
    movie: MovieType; navigation: NavigationScreenProp<any>;
})=> {

    // Destructuring properties
    const {poster_path, original_title, overview,vote_count} = movie;

    //Get the poster_image of the current item
    const poster_image: string = useRessource({path: poster_path, size: 'w342'});

    // Use React Lazy loading to load images : usefull for slow network and big ressources sized
    const LazyImage = React.lazy(() => import('~/components/LazyImage/index'));

    return (
        <TouchableOpacity activeOpacity={0.7} style={itemRow}
                          onPress={() => navigation.navigate('detail', {'movie': movie})}
        >
            <View style={imageWrapper}>
                <Suspense fallback={
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator
                            color={Colors.white}
                            style={{marginVertical: Platform.OS === 'ios' ? 10 : 0}}
                            size={Platform.OS === 'ios' ? 1 : 24}
                        />
                    </View>
                }>
                    <LazyImage
                        image={poster_image}
                        style={image} width={300} height={1}/>
                </Suspense>
            </View>
            <View style={detailWrapper}>
                <View>
                    <Text
                        extraLarge
                        numberOfLines={1}
                        style={titleStyle}>
                        {original_title}
                    </Text>
                    <Text numberOfLines={2} small style={subtitleStyle}>
                        {overview}
                    </Text>
                </View>
                <View style={itemStat}>
                    <View style={ratingContainer}>
                        <Rating
                            ratingCount={5}
                            imageSize={15}
                            readonly={true}
                        />
                        <Text
                            extraLarge
                            numberOfLines={1}
                            style={Object.assign({}, titleStyle, {marginLeft: 10})}>
                            {vote_count}
                        </Text>
                    </View>
                    <Icon type={'entypo'} size={26} color={Colors.black}
                          name={'star-outlined'}/>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default SearchResultItem;
