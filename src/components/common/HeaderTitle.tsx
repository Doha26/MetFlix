import React from 'react';
import {View, Platform, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {withTheme} from '~/theming/index';
import Text from './Text';

const propTypes = {
  title: PropTypes.string.isRequired,
};

const HeaderTitle = ({title, theme}: {title: string; theme: any}) => (
  <View style={styles.headerContainer}>
    <Text bold color={theme.primaryColor}>
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

export default withTheme(HeaderTitle);
