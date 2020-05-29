import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {Image, View, TouchableOpacity} from 'react-native';
import Text from '~/components/common/Text';
import {MovieType} from '~/types/Movie';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import styles from "~/screens/Home/components/Documentary/style";

function DocumentaryItem({movie, navigation}: {
  movie: MovieType; navigation: NavigationScreenProp<any>;
}) {

  const {
    title,
    posterPath,
    description,
  } = movie;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log(1)} style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={posterPath}
        />
        <LinearGradient
          locations={[0.1, 0.1, 1]}
          colors={[Colors.black00, Colors.black40, Colors.black100]} style={styles.detailsWraper}>
          <Text
            extraLarge
            numberOfLines={1}
            style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
          >
            {title}
          </Text>
          <Text small style={{color: Colors.darkGrey, fontWeight: '400', color: Colors.white}}>
            {description}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(DocumentaryItem);
