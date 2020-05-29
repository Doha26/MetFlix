import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {Image, View, TouchableOpacity} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import styles from "~/screens/Home/components/popular-tv/style";
import {useRessource} from "~/hooks/use-ressource";
import {WIDTH} from "~/utils/dimensions";

function PopularTvItem({movie, navigation}: {
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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log(1)} style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: poster_image,
            width: (WIDTH / 3) + 5, height: 1
          }}
        />
        <LinearGradient
          locations={[0.1, 0.1, 1]}
          colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
          <Text
            extraLarge
            numberOfLines={1}
            style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
          >
            {original_title}
          </Text>
          <Text small numberOfLines={2} style={{fontWeight: '400', color: Colors.white}}>
            {overview}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(PopularTvItem);
