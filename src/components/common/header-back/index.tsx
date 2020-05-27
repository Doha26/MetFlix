import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from './';

const HeaderBack = ({ navigation: { props } }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => setTimeout(props, 0)}>
      <Icon
        large
        name="arrow-left"
      />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginLeft: 16,
  },
});

export default withNavigation(HeaderBack);
