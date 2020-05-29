import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import {MovieType} from '~/types/Movie';
import {TouchableOpacity, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';
import styles from "~/screens/Home/components/styles";


 function Poster({movie, navigation : {navigate}}: {movie: MovieType; navigation: NavigationScreenProp<any>}) {

   const {
    title,
    posterPath,
    description,
  } = movie;

  // @ts-ignore
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
          <Text small style={{color: Colors.white, fontWeight: '400'}}>
            {description}
          </Text>
          <Text
            extraLarge
            numberOfLines={1}
            style={{fontSize: 22, marginTop: 3, fontWeight: '500', color: Colors.white}}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}



export default withNavigation(Poster);
