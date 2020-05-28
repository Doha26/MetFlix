import React from 'react';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';
import {MovieType} from '~/types/Movie';
import {TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '~/theming/colors';
import Text from '~/components/common/Text';


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
          <Text small style={{color: Colors.darkGrey, fontWeight: '400', color: Colors.white}}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
     height: 250, marginTop: 110,
  },

  imageWrapper: {
    flex: 1,
    borderRadius:8,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'orange',
    position: 'relative',
    transform: [{scale: 1}],
  },
  image: {
    flex: 1,
    width: '100%',
  },
  detailsWraper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: Colors.lightgray,
  },
});

export default withNavigation(Poster);
