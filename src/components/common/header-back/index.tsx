import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '~/components/common/Icon';
import Text from '~/components/common/Text';
import Colors from '~/theming/colors';


const propTypes = {
  onPress: PropTypes.func,
};

const defaultProps = {
  onPress: () => {
  },
};


const HeaderBack = ({onPress}: {onPress: () => void}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Icon
        large
        name="arrow-left"
      />
    </TouchableOpacity>
    <Text style={styles.titleStyle}>Detail</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 4,
    marginLeft: 16,
    alignItems: 'center',
    zIndex:1100,
    position:'absolute'
  },
  titleStyle: {
    color: Colors.white,
    fontSize:20,
    marginLeft: 40,
  },
});


HeaderBack.propTypes = propTypes;
HeaderBack.defaultProps = defaultProps;

export default HeaderBack;
