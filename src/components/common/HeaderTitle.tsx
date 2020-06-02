import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Text from './Text';
import Colors from '~/theming/colors';

const propTypes = {
  title: PropTypes.string.isRequired,
};

const HeaderTitle = ({title}: {title: string;}) => (
  <View style={styles.headerContainer}>
    <Text bold color={Colors.white}>
      {title}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    ...Platform.select({
      android: {
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
      },
    }),
  },
});

HeaderTitle.propTypes = propTypes;

export default HeaderTitle;
