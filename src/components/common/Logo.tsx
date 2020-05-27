import React from 'react';
import {StyleSheet} from 'react-native';
import Text from '~/components/common/Text';
import Colors from '~/theming/colors';

//const mLogo  = require("~/assets/images/logo.jpeg");

const Logo = () => (
 <Text bold={true} color={Colors.white} large={true} style={styles.logo}>Metflix</Text>
);

const styles = StyleSheet.create({
  logo:{
    fontWeight:'bold',
    fontSize:80,
    color: Colors.red
  }
});

export default Logo;
